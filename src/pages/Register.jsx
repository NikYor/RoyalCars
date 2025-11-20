import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { registerRequest } from '../services/authService';
import { setError, clearFeedback } from '../store/feedbackSlice';
import FormInput from '../components/FormInput';
import useForm from '../hooks/useForm';

const Register = () => {
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '', role: 'user' },
    async (formData) => {
      dispatch(clearFeedback());
      try {
        const data = await registerRequest(formData.email, formData.password, formData.role);

        await login({ email: formData.email, password: formData.password });

        localStorage.setItem('token', data.token);

        navigate('/profile');
      } catch (err) {
        dispatch(setError(err.message || 'Registration failed'));
      }
    }
  );

  return (
    <div className="container py-5 w-25" style={{ alignContent: 'center' }}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        {['email', 'password'].map((field) => (
          <FormInput
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button
          type="submit"
          className="btn btn-primary px-5 mt-3 mx-auto d-block"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
