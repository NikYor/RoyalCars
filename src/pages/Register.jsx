import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { registerRequest } from '../services/authService';
import { setError, clearFeedback } from '../store/feedbackSlice';
import FormInput from '../components/FormInput';

const Register = () => {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFeedback());

    try {
      const data = await registerRequest(formData.email, formData.password, role);
      await login(formData);
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message || 'Registration failed'));
    }
  };

  return (
    <div className="container py-5 w-25" style={{alignContent: 'center'}}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        {[
          'email', 'password'
        ].map((field) => (
          <FormInput
            key={field}
            label={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required={field !== 'image'}
          />
          ))}
        <button type="submit" className="btn btn-primary px-5 mt-3 mx-auto d-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
