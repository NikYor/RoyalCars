import { Router } from 'express';
import fs from "fs";
import { ObjectId } from 'mongodb';
import { User, Company, Item} from '../models/index.js';

// const users = require('../../my_files/users.json');
// const companies = require('../../my_files/companies.json');
// const cars = require('../../my_files/cars.json');

const appRouter = Router();

const alive = (req, res) => {
  res.status(200).json({message: 'Alive'})
}

const importdata = async (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('./my_files/users.json', 'utf8'));
    const companies = JSON.parse(fs.readFileSync('./my_files/companies.json', 'utf8'));
    const cars = JSON.parse(fs.readFileSync('./my_files/cars.json', 'utf8'));

    const transformedUsers = users.map(u => ({
      ...u,
      _id: new ObjectId(u._id),
      approvedBy: u.approvedBy.map(id => new ObjectId(id)),
      createdAt: new Date(u.createdAt),
      updatedAt: new Date(u.updatedAt)
    }));

    const transformedCompanies = companies.map(c => ({
      ...c,
      _id: new ObjectId(c._id),
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      cash: Number(c.cash)
    }));

    const transformedCars = cars.map(car => ({
      ...car,
      _id: new ObjectId(car._id),
      createdBy: new ObjectId(car.createdBy),
      company: new ObjectId(car.company),
      mileage: Number(car.mileage),
      price: Number(car.price),
      lat: Number(car.lat),
      lng: Number(car.lng),
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      date: new Date(car.date)
    }));

    await User.insertMany(transformedUsers);
    await Company.insertMany(transformedCompanies);
    await Item.insertMany(transformedCars);

    res.status(200).json({ message: 'Data imported successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Import failed', details: error.message });
  }
}

appRouter.get('/alive', alive);
appRouter.get('/import', importdata);


export default appRouter;