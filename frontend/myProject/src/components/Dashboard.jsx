import React from "react";
import Navbar from "./Navbar"; // Import Navbar

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Include Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>

        {/* Example Card */}
        <div className="max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Welcome to the Dashboard!
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            This is an example card to show how you can structure content on your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
