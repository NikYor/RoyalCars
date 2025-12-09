const BASE_URL = `${import.meta.env.VITE_APP_SERVER}/booking`;

export const getUserBookings = async (token) => {
  const res = await fetch(`${BASE_URL}/my`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const getBookingById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) throw new Error('Booking not found');
  return res.json();
};

export const createBooking = async (bookingData, token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
};

export const updateBooking = async (id, bookingData, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
};

export const deleteBooking = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete booking');
  return res.json();
};

export const bookingList = async (token) => {
  const res = await fetch(`${BASE_URL}/grouped`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const saveSurvey = async (surveyData, token) => {
  const res = await fetch(`${import.meta.env.VITE_APP_SERVER}/survey`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    method: 'POST',
    body: JSON.stringify(surveyData),
  });
  if (!res.ok) throw new Error('Failed to save survey');
  return res.json();
}

export const getSurveys = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_APP_SERVER}/survey`, {
    headers: {
      Authorization: `${token}`,
    }
  });
  if (!res.ok) throw new Error('Failed to fetch surveys');
  return res.json();
}


