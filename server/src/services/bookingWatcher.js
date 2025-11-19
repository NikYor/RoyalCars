import { schedule } from 'node-cron';
import axios from 'axios';
import pkg from '@mapbox/polyline';
import { Booking, Item } from '../models/index.js';
import { io } from '../index.js';

const { decode } = pkg
const GOOGLE_API_KEY = "AIzaSyAvvycz7lLgGajPvMgu37mt9-OgtrC_b_c";

async function fetchRoutePolyline(origin, destination) {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': GOOGLE_API_KEY,
    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
  };

  const body = {
    origin: {
      "address": origin
    },

    destination: {
      "address": destination
   },
    travelMode: 'DRIVE',
  };

  const res = await axios.post(url, body, { headers });
  // return res.data.routes?.[0]?.polyline?.encodedPolyline;
  return {
    polyline: res.data.routes?.[0]?.polyline?.encodedPolyline,
    distanceMeters: res.data.routes?.[0]?.distanceMeters,
    duration: res.data.routes?.[0]?.duration,
  };
}

schedule('* * * * *', async () => {
  const now = new Date();
  console.log(`[CRON] Running at ${now.toISOString()}`);

  const bookings = await Booking.find({
    pickupDate: now.toLocaleDateString('en-CA'),
    pickupTime: { $lte: now.toTimeString().slice(0, 5) },
    status: 'scheduled'
  });

  for (const booking of bookings) {
    try {
      const res = await fetchRoutePolyline(
        booking.pickupLocation,
        booking.dropLocation
      );

      console.log('--------------------------------> : ',res);
      

      booking.encodedPolyline = res.polyline;
      booking.status = 'inTransit';
      booking.currentIndex = 0;
      booking.distanceMeters = res.distanceMeters;
      booking.duration = res.duration;
      
      await booking.save();

      console.log(`Booking ${booking._id} started with steps`);
    } catch (err) {
      console.error(`Failed to fetch route for booking ${booking._id}:`, err.message);
    }
  }
});

schedule('*/1 * * * * *', async () => {
  const bookings = await Booking.find({ status: 'inTransit' });

  for (const booking of bookings) {
    const decodedRoute = decode(booking.encodedPolyline).map(([lat, lng]) => ({ lat, lng }));

    if (booking.currentIndex >= decodedRoute.length) {
      booking.status = 'completed';
      const car = await Item.findById(booking.car);
      car.mileage += Number(booking.distanceMeters);
      car.status = 'free';
      await car.save();
      await booking.save();
      io.emit('complete', {
        carId: booking.car,
        carStatus: car.status,
        carMileage: car.mileage,
        status: booking.status
      })
      console.log(`[CRON-MOVE] Booking ${booking._id} completed`);
      continue;
    }

    const nextPoint = decodedRoute[booking.currentIndex];

    const car = await Item.findByIdAndUpdate(booking.car, {
      lat: nextPoint.lat,
      lng: nextPoint.lng,
      status: 'in use'
    });

    booking.lat = nextPoint.lat;
    booking.lng = nextPoint.lng;
    booking.currentIndex += 1;
    await booking.save();

    if (booking.currentIndex === 1) { 
      io.emit('newRoute', {
        carId: booking.car,
        lat: booking.lat,
        lng: booking.lng,
        carStatus: car.status
      })
    }

    io.emit("carUpdate", {
      carId: booking.car,
      lat: booking.lat,
      lng: booking.lng,
      status: booking.status,
      carStatus: car.status
    });

    console.log(`[CRON-MOVE] Car ${booking.car} moved to ${nextPoint.lat}, ${nextPoint.lng}`);
  }
});