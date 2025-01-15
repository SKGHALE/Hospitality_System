'use client'

import React, { useState, useEffect } from 'react'
import { UserCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import the react-router-dom hook for redirection

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const navigate = useNavigate() // Initialize the useNavigate hook

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer) // Cleanup the timer on unmount
  }, [])

  // Handle logout
  const handleLogout = () => {
    navigate('/login')  // Adjust the path to your actual login route
  }

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 mr-4">
              {currentTime.toLocaleTimeString()}
            </span>
            <button className="text-gray-800 hover:text-gray-600 focus:outline-none">
              <UserCircle className="h-8 w-8" />
            </button>
            <button
              className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout} // On click, call the handleLogout function
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
