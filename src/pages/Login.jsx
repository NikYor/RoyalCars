import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { setError, clearFeedback } from '../store/feedbackSlice';
import FormInput from '../components/FormInput';

const Login = () => {
  const { login } = useContext(AuthContext);
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
      await login(formData);
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message || 'Login failed'));
    }
  };

  return (
    <div className="container py-5 w-25" style={{alignContent: 'center'}}>
      <h2 className="text-center">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
