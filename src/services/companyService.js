const BASE_URL = `${import.meta.env.VITE_APP_SERVER}/companies`;

export const getAllCompanies = async () => {
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}