import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { setError, clearFeedback } from '../store/feedbackSlice';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFeedback());

    try {
      await login({ email, password }); // ✅ await ensures proper error catching
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message || 'Login failed'));
    }
  };

  return (
    <div className="container py-5 w-25" style={{ height: '83vh', alignContent: 'center' }}>
      <h2 className="text-center">Login</h2>
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
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary px-5 mt-3 mx-auto d-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
