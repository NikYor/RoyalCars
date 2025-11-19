import { Item } from '../models/index.js';

export async function getAllCars(req, res) {
  const events = await Item.find().populate('createdBy', 'email').populate('registeredUsers', 'email');
  res.json(events);
}

export async function getCarById(req, res) {
  const event = await Item.findById(req.params.id).populate('createdBy', 'email').populate('registeredUsers', 'email');
  if (!event) return res.status(404).json({ message: 'Събитието не е намерено' });
  res.json(event);
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
    const event = new Item({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Грешка при създаване', error: err.message });
  }
}

export async function updateCar(req, res) {
  try {
    const event = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Събитието не е намерено' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: 'Грешка при редакция', error: err.message });
  }
}

export async function deleteCar(req, res) {
  const event = await Item.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: 'Събитието не е намерено' });
  res.json({ message: 'Събитието е изтрито' });
}

export async function registerUser(req, res) {
  const event = await Item.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Събитието не е намерено' });

  if (event.registeredUsers.includes(req.userId)) {
    return res.status(400).json({ message: 'Вече сте записан' });
  }

  event.registeredUsers.push(req.userId);
  await event.save();
  res.json({ message: 'Успешно записан', event });
}
