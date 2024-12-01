import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoginPage = () => {
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobile: "",
    otp: Array(6).fill(""),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOTPChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOTP = [...formData.otp];
      updatedOTP[index] = value;
      setFormData((prevData) => ({ ...prevData, otp: updatedOTP }));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData.username, formData.password, formData.mobile);
    setShowOTP(true); // Show OTP form
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const otp = formData.otp.join(""); // Combine the six digits
    if (otp.length === 6) {
      console.log("OTP:", otp);
      alert("Login successful!");
      navigate("/navbar"); // Redirect to Navbar page
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
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                required
                className="block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
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
