const BASE_URL = 'http://localhost:3000/api/cars';

export const getAllCars = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
};

export const getCarById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Car not found');
  return res.json();
};

export const createCar = async (carData, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(carData),
  });
  if (!res.ok) throw new Error('Failed to create car');
  return res.json();
};

export const updateCar = async (id, carData, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(carData),
  });
  if (!res.ok) throw new Error('Failed to update car');
  return res.json();
};

export const deleteCar = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete car');
  return res.json();
};
