import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { OTPInput } from "./Otp-input.jsx";
import Image from "../assets/Image.jpg";
import RegisterForm from './RegisterForm.jsx';
import { loginWithPassword, sendOtp, verifyOtp } from '../../api.js';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginWithPassword(username, password);
      console.log('Login successful:', data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await sendOtp(mobileNumber);
      console.log('OTP sent:', data);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await verifyOtp(mobileNumber, otp);
      console.log('OTP verification successful:', data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpComplete = (completedOtp) => {
    setOtp(completedOtp);
    console.log('OTP entered:', completedOtp);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setActiveTab('password');
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
              disabled={showRegister}
            >
              Mobile Number
            </button>
          </div>
        </div>

        {showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <>
            {activeTab === 'password' ? (
              <form onSubmit={handlePasswordLogin} className="space-y-6">
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
                      handleShowRegister();
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpLogin} className="space-y-6">
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
