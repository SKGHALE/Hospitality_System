import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { OTPInput } from "./Otp-input";
import Image from "../assets/image.jpg";
import RegisterForm from './RegisterForm'; // Import the RegisterForm component

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false); // State to toggle register form
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    // Validate username and password
    if (username && password) {
      console.log('Password login attempted with:', { username, password });
      setLoading(true); // Show loading state

      try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setLoading(false); // Hide loading state

        if (response.ok) {
          console.log('Login successful:', data);
          navigate('/dashboard'); // Redirect to dashboard
        } else {
          setError(data.message || 'Login failed. Please check your credentials.');
        }
      } catch (error) {
        setLoading(false); // Hide loading state
        console.error('Error during login:', error);
        setError('An error occurred. Please try again later.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleOtpLogin = (e) => {
    e.preventDefault();
    // Mock OTP login logic
    if (mobileNumber && otp) {
      console.log('OTP login attempted with:', { mobileNumber, otp });
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleSendOtp = () => {
    console.log('Sending OTP to:', mobileNumber);
  };

  const handleOtpComplete = (completedOtp) => {
    setOtp(completedOtp);
    console.log('OTP entered:', completedOtp);
  };

  const handleShowRegister = () => {
    setShowRegister(true); // Show register form
    setActiveTab('password'); // Reset to password tab when register form opens
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <div className="mb-6">
          <div className="flex rounded-md bg-white bg-opacity-20">
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-2 rounded-md ${activeTab === 'password' ? 'bg-white bg-opacity-30' : ''}`}
            >
              User Name
            </button>
            <button
              onClick={() => setActiveTab('otp')}
              className={`flex-1 py-2 rounded-md ${activeTab === 'otp' && !showRegister ? 'bg-white bg-opacity-30' : ''}`}
              disabled={showRegister} // Disable mobile number tab if register form is visible
            >
              Mobile Number
            </button>
          </div>
        </div>

        {/* Conditional rendering based on showRegister */}
        {showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <>
            {activeTab === 'password' ? (
              <form onSubmit={handlePasswordLogin} className="space-y-6">
                {/* Login form for Password */}
                <div>
                  <label htmlFor="username" className="block text-white mb-1">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-white placeholder-opacity-70"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-white mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-white placeholder-opacity-70"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-white text-purple-600 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors"
                >
                  Sign In
                </button>

                <div className="mt-4 text-center text-sm text-white">
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className="font-medium hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowRegister(); // Toggle to show the Register form and reset to password tab
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpLogin} className="space-y-6">
                {/* OTP Login */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-white mb-1">Mobile Number</label>
                  <input
                    id="mobileNumber"
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-white placeholder-opacity-70"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-2 px-4 bg-white text-purple-600 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors"
                >
                  Send OTP
                </button>

                <OTPInput onComplete={handleOtpComplete} />

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-white text-purple-600 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors"
                >
                  Verify OTP
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
