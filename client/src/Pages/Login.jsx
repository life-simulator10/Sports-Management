import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext'; // Import AppContext

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection
  const { login } = useContext(AppContext);  // Access login from AppContext

  const toggleForm = (isLoginMode) => {
    setIsLogin(isLoginMode);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // User is trying to login
        response = await axios.post('http://localhost:1000/api/user/login', { email, password });
        if (response.data.success) {
          localStorage.setItem('token', response.data.token); // Save token to localStorage
          login();  // Set user as authenticated in the context
          navigate('/message');  // Redirect to the Message page only on login
        } else {
          alert(response.data.message);
        }
      } else {
        // User is trying to register
        response = await axios.post('http://localhost:1000/api/user/register', { name, email, password });
        if (response.data.success) {
          alert('Registration successful! Please log in.');
          toggleForm(true);  // Switch to login form after successful registration
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-4 flex">
          <button
            className={`flex-1 py-2 px-4 text-center ${isLogin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => toggleForm(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${!isLogin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => toggleForm(false)}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl text-blue-950 mb-6 text-center font-bold">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
