const BASE_URL = 'http://localhost:3000/api';

export const loginRequest = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Invalid credentials');
  }
  const data = await res.json();
  
  localStorage.setItem('auth', JSON.stringify({email: data.user.email, role: data.user.role}));
  localStorage.setItem('token', data.token);
};

export const registerRequest = async (email, password, role = 'user') => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await res.json();
};

export const requestAdmin = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/request-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Request failed');
  }

  return await res.json(); // e.g. { message: 'Request sent' }
};

export const getPendingRequests = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/admin/pending`, {
    headers: { Authorization: `${token}` },
  });

  if (!res.ok) throw new Error('Failed to fetch requests');
  return await res.json(); // { users: [...] }
};

export const approveAdmin = async (userId) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/admin/approve/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) throw new Error('Approval failed');
  return await res.json(); // { message: 'User promoted to admin' }
};



