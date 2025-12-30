import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const success = await login({ email, password }); // Pass email and password directly
      if (success) {
        navigate('/');
      }
      alert('Login successful');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const username = e.target.newUsername.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.newPassword.value.trim();

    try {
      const res = await axios.post('http://localhost:5001/api/users/signup', {
        username,
        email,
        password,
      });
      alert(res.data.message || 'Account created successfully');
      setShowCreate(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 drop-shadow-md">
        {showCreate ? 'Create Account' : 'Login'}
      </h1>

      {!showCreate ? (
        <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-md">
          {/* Login Form */}
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              required
            />
          </div>
          <div className="mb-8 relative">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 bottom-1.5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => setShowCreate(true)}
            >
              Create Account
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleCreateAccount} className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-md">
          {/* Create Account Form */}
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="newUsername">
              Username
            </label>
            <input
              type="text"
              id="newUsername"
              placeholder="Choose a username"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              required
            />
          </div>
          <div className="mb-8 relative">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="newPassword">
              Password
            </label>
            <input
              type={showSignupPassword ? 'text' : 'password'}
              id="newPassword"
              placeholder="Create a password"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              required
            />
            <span
              onClick={() => setShowSignupPassword(!showSignupPassword)}
              className="absolute right-5 bottom-1.5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showSignupPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition"
            >
              Create Account
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => setShowCreate(false)}
            >
              Login here
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Loginpage;
