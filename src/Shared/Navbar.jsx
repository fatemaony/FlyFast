import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiUser } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa';
import Logo from '../Logo/Logo';
import useAuth from '../Hook/useAuth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { user, SignOut } = useAuth();

  const handleSignOut = () => {
    SignOut()
      .then(() => console.log("Sign out successfully"))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const linksArray = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/service' },
    { name: 'Coverage', path: '/coverage' },
    ...(user ? [{ name: 'Parcel', path: '/parcel' }] : []),
    { name: 'About Us', path: '/about' }
  ];

  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <motion.nav
        className={`navbar fixed shadow top-0 left-0 right-0 px-4 sm:px-8 lg:px-12 transition-all duration-300 ${
          scrolled ? 'bg-base-100/90 backdrop-blur-sm shadow-lg' : 'bg-base-100/80 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="navbar-start">
          {/* Drawer toggle button (mobile) */}
          <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden">
            <FiMenu size={22} />
          </label>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="p-0 -mt-5">
            <Logo />
          </motion.div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <motion.ul className="menu menu-horizontal px-1 gap-1">
            {linksArray.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="font-medium hover:text-primary-focus transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex gap-2 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle p-2"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }}>
            {user ? (
              <button onClick={handleSignOut} className="btn btn-ghost gap-2">
                Sign Out
              </button>
            ) : (
              <Link to="/signin" className="btn btn-ghost gap-2">
                <FiUser />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/rider" className="btn btn-primary gap-2">
              <FaMotorcycle />
              <span className="hidden sm:inline">Be Rider</span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Drawer sidebar content (mobile menu) */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          <div className="mb-6">
            <Logo />
          </div>

          {linksArray.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => document.getElementById('my-drawer').checked = false}
                className="text-primary font-medium hover:text-primary-focus transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <div className="mt-4 border-t pt-4">
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  document.getElementById('my-drawer').checked = false;
                }}
                className="btn btn-outline btn-sm w-full"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="btn btn-outline btn-sm w-full"
                onClick={() => document.getElementById('my-drawer').checked = false}
              >
                Sign In
              </Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
