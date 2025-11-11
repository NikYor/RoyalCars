// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Login = () => {
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');


//     // TODO: Replace with real API call
//     // const mockUser = { email: formData.email, token: 'mock-token', role: 'admin' };
//     // login(mockUser);
//     // navigate('/profile');
//     try {
//       const res = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email, password: formData.password }),
//       });

//       if (!res.ok) throw new Error('Invalid credentials');

//       const data = await res.json();
//       login(data.email, data.role); // запазваме в контекста
//       localStorage.setItem('token', data.token); // по желание

//       navigate('/profile');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
//         <div className="col-md-6">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-12 text-center mt-4">
//           <button type="submit" className="btn btn-primary px-5">Login</button>
//         </div>
//       </form>
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// };

// export default Login;
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      login({email, password});
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5 w-25" style={{height: '83vh', alignContent: 'center'}}>
      <h2 className='text-center'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary px-5 mt-3 mx-auto d-block">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
