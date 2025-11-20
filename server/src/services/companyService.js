import {Item , Company} from '../models/index.js';


export async function getAllCompanies(req,res) {
  try {
    const cars = await Item.find().populate('company');

    const companiesMap = {};

    cars.forEach(car => {
      const companyName = car.company?.name || 'Unknown';
      if (!companiesMap[companyName]) {
        companiesMap[companyName] = [];
      }
      companiesMap[companyName].push(car);
    });

    const result = Object.entries(companiesMap).map(([name, carsList]) => ({
      [name]: carsList
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
}