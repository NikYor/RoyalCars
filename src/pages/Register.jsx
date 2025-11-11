import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerRequest } from '../services/authService';

const Register = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await registerRequest(email, password, role);
      login({email, password});
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5 w-25" style={{height: '83vh', alignContent: 'center'}}>
      <h2 className='text-center'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> */}
        <button type="submit" className="btn btn-primary px-5 mt-3 mx-auto d-block">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
export default Register;
