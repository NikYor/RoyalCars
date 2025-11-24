const BASE_URL = 'http://localhost:3000/api';

export const loginRequest = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Invalid credentials');
  }
  const data = await res.json();
  
  localStorage.setItem('auth', JSON.stringify({email: data.user.email, role: data.user.role}));
  localStorage.setItem('token', data.token);
};
// ============ Refresh logic ============

export const refreshAccessToken = async () => {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: 'POST',
    credentials: 'include', // ⬅️ sends the cookie
  });

  if (!res.ok) throw new Error('Failed to refresh token');
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data.token;
};

const isTokenExpired = (token) => {
  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
};

export const secureFetch = async (url, options = {}) => {
  let token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
      localStorage.setItem('token', token);
    } catch (err) {
      throw new Error('Session expired. Please log in again.');
    }
  }

  options.headers = {
    ...(options.headers || {}),
    Authorization: `${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, options);
};

//===============================================

export const logoutRequest = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Logout failed');
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

export const requestAdmin = async (company) => {
  const res = await secureFetch(`${BASE_URL}/request-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Request failed');
  }

  return await res.json();
};

export const getPendingRequests = async () => {
  const res = await secureFetch(`${BASE_URL}/admin/pending`, {});

  if (!res.ok) throw new Error('Failed to fetch requests');
  return await res.json();
};

export const approveAdmin = async (userId) => {
  const res = await secureFetch(`${BASE_URL}/admin/approve/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) throw new Error('Approval failed');
  return await res.json();
};


export const getUserById = async (userId) => {
  const res = await secureFetch(`${BASE_URL}/user/${userId}`, {});

  if (!res.ok) throw new Error('Failed to fetch user');
  return await res.json();
};




