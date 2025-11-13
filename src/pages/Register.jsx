import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { registerRequest } from '../services/authService';
import { setError, clearFeedback } from '../store/feedbackSlice';

const Register = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFeedback());

    try {
      const data = await registerRequest(email, password, role);
      await login({ email, password }); // ✅ ensure login is awaited
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message || 'Registration failed'));
    }
  };

  return (
    <div className="container py-5 w-25" style={{ height: '83vh', alignContent: 'center' }}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary px-5 mt-3 mx-auto d-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
