import { Booking, User, Survey } from '../models/index.js';


export async function bookCreate(req, res) {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const booking = new Booking({ ...req.body, email: user.email, userId: user._id, status: 'scheduled'});
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: 'Error creating booking', error: err.message });
  }
}

export async function bookById(req, res) {
  try {
    const booking = await Booking.find({car:req.params.id});
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking', error: err.message });
  }
}

export async function bookList(req, res) {
  try {
    const grouped = await Booking.aggregate([
      {
        $group: {
          _id: "$car",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "cars",
          localField: "_id",
          foreignField: "_id",
          as: "car"
        }
      },
      { $unwind: "$car" },
      { $sort: { count: -1 } }
    ]);

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error fetching grouped bookings", error: err.message });
  }
};

export async function surveyCreate(req, res) {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json(survey);
  } catch (err) {
    res.status(400).json({ message: 'Error creating survey', error: err.message });
  }
}

export async function surveyList(req, res) {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching surveys', error: err.message });
  }
}

