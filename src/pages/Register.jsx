import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { registerRequest, getUsersCount } from '../services/authService';
import { setError, clearFeedback } from '../store/feedbackSlice';
import FormInput from '../components/FormInput';
import useForm from '../hooks/useForm';

const Register = () => {
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0)

  useEffect(() => {
    dispatch(clearFeedback())
    async function fetchUsers () {
      try {
        const res = await getUsersCount()
        setUsersCount(res.userCount)
      } catch {
        dispatch(setError("Failed to retrieve users count"))
      }
    }

    fetchUsers()
  }, [])

  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '', role: 'user' },
    async (formData) => {
      dispatch(clearFeedback());
      try {
        const data = await registerRequest(formData.email, formData.password, formData.role, formData.company);

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
        {usersCount === 0 && (
          <FormInput
            label="company"
            name="company"
            value={values.company || ''}
            onChange={handleChange}
            required
          />
        )}
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
