import { Item, User } from '../models/index.js';

export async function getAllCars(req, res) {
  const items = await Item.find().populate('createdBy', 'email').populate('registeredUsers', 'email');
  res.json(items);
}

export async function getCarById(req, res) {
  const item = await Item.findById(req.params.id).populate('createdBy', 'email').populate('registeredUsers', 'email');
  if (!item) return res.status(404).json({ message: 'Error fetching your car' });
  res.json(item);
}

export async function getAllCarsByOwner(req, res) {
  try {
    const ownerId = req.user.id;

    const cars = await Item.find({ createdBy: ownerId });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your cars', error: err.message });
  }
}

export async function createCar(req, res) {
  try {
    const user = await User.findById(req.user.id);

    const item = new Item({ ...req.body, createdBy: user._id, company: user.company?._id });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Грешка при създаване', error: err.message });
  }
}

export async function updateCar(req, res) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Колата не е намерена' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Грешка при редакция', error: err.message });
  }
}

export async function deleteCar(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Колата не е намерена' });
  res.json({ message: 'Колата е изтрита' });
}

export async function registerUser(req, res) {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Колата не е намерена' });

  if (item.registeredUsers.includes(req.userId)) {
    return res.status(400).json({ message: 'Вече сте записан' });
  }

  item.registeredUsers.push(req.userId);
  await item.save();
  res.json({ message: 'Успешно записан', item });
}
