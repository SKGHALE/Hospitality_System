import Image from "../assets/Image.jpg"
import Logo from "../assets/Image.jpg"
const LandingPage = () => {

  const landingMessage = "Welcome To Our Web Page"
  const navigation = [

    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];


  return (
    <div className="bg cover bg-center h-screen" style={{ backgroundImage: `url(${Image})` }}>
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
                src={Logo}
                className="h-20 w-auto"
              />
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 border-1 rounded-lg bg-blue-100 text-sm font-semibold text-gray-900 hover:bg-red-200 transition-all duration-100 "
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="px-4 py-2 border-1 rounded-lg bg-blue-100 text-sm font-semibold text-gray-900 hover:bg-red-200 transition-all duration-100 ">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="py-5 mt-5 text-5xl font-semibold border-1 bg-slate-800 rounded-lg text-red-200">
              Hospitality Management System
            </h1>
            <p className="mt-8 text-lg font-medium border-1  bg-slate-800 rounded-lg text-rose-500 sm:text-xl">
              {landingMessage || 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
