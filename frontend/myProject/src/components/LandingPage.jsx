// components/LandingPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const LandingPage = () => {
  const [landingMessage, setLandingMessage] = useState('');

  useEffect(() => {
    // API call specific to this component
    axios
      .get('http://localhost:5001/api/landing')
      .then((response) => setLandingMessage(response.data.message))
      .catch((error) => console.error('Error fetching landing page data:', error));
  }, []);

  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ];
  

  return (
    
    <div className="bg-white">
      {/* Header Section */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              {landingMessage || 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
