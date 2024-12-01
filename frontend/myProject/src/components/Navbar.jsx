import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  // Set the current date on load
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle sign out
  const handleSignOut = () => {
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-100 dark:bg-green-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Company Name */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MyCompany
            </span>
          </div>

          {/* Current Date */}
          <div className="text-gray-600 dark:text-gray-300">
            {currentDate}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
