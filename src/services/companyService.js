import { secureFetch } from "./authService";

const BASE_URL = 'http://localhost:3000/api/companies';

export const getAllCompanies = async () => {
  const res = await secureFetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}