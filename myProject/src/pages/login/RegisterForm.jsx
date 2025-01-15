import React, { useState } from 'react';
import { registerUser } from '../../api.js';

const RegisterForm = ({ setShowRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setLoading(true);

        // Basic form validation
        if (!username || !password || !mobile) {
            setError('Please fill all fields.');
            setLoading(false);
            return;
        }

        try {
            const data = await registerUser(username, password, mobile);
            console.log('Registration successful:', data);
            setSuccess('Account created successfully! Please sign in.');
            setUsername('');
            setPassword('');
            setMobile('');
            setShowRegister(false); // Switch to the login screen after successful registration
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[350px] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6 border border-white border-opacity-20">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">Register</h2>
                <p className="text-sm text-white text-opacity-80">Create a new account</p>
            </div>
            <form onSubmit={handleRegister}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="username" className="text-sm font-medium text-white">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-70"
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-70"
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="mobile" className="text-sm font-medium text-white">Mobile Number</label>
                        <input
                            id="mobile"
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter your mobile number"
                            className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-70"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-white text-purple-600 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
            {success && <p className="text-sm text-green-500 mt-4">{success}</p>}
            <p className="mt-4 text-center text-sm text-white text-opacity-80">
                Already have an account?{' '}
                <a
                    href="#"
                    className="font-medium text-white hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowRegister(false); // Switch back to login screen
                    }}
                >
                    Sign in
                </a>
            </p>
        </div>
    );
};

export default RegisterForm;
