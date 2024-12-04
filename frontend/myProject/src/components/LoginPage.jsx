import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig'; // Firebase initialization
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import axios from "axios";

const LoginPage = () => {
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    otp: Array(6).fill(""),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");  // Store the mobile number

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle OTP input
  const handleOTPChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOTP = [...formData.otp];
      updatedOTP[index] = value;
      setFormData((prevData) => ({ ...prevData, otp: updatedOTP }));
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login Response:", response.data);

      if (response.data.token) {
        // Assuming the response contains the mobile number
        setMobileNumber(response.data.mobile);
        await sendOTP(response.data.mobile); // Send OTP to the mobile number
        setShowOTP(true); // Show OTP input form
      } else {
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response || error.message); // log the error response
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP to the user's mobile
  const sendOTP = async (mobile) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible", // Invisible reCAPTCHA
        callback: (response) => {
          console.log("reCAPTCHA resolved:", response);
        },
      }, auth);

      // Send OTP using Firebase's phone authentication
      const phoneNumber = `+${mobile}`; // Add the country code
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

      // Store the confirmation result (needed for verification)
      setConfirmationResult(confirmationResult);
      alert("OTP sent to your mobile number.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP submission
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const otp = formData.otp.join(""); // Combine OTP digits
    if (otp.length === 6) {
      try {
        const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
        const userCredential = await signInWithCredential(auth, credential);

        console.log("OTP verification response:", userCredential);

        // OTP verification successful
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to the dashboard
      } catch (error) {
        console.error("OTP Verification Error:", error);
        alert("OTP verification failed. Please try again.");
      }
    } else {
      alert("Please enter a 6-digit OTP!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {showOTP ? "Enter OTP" : "Log in to your account"}
        </h2>
        {!showOTP ? (
          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="mt-8 space-y-6">
            <div className="flex justify-between">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOTPChange(e.target.value, index)}
                  required
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
