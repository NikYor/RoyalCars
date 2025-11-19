import { Booking, User } from '../models/index.js';


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
