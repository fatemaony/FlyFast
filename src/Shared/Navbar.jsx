import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const links = [
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`navbar fixed shadow top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 transition-all duration-300 ${scrolled ? 'bg-base-100/90 backdrop-blur-sm shadow-lg' : 'bg-base-100/80 backdrop-blur-sm'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <motion.button
            whileTap={{ scale: 0.9 }}
            tabIndex={0}
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost lg:hidden p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
          
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Link 
                    to={link.path} 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="btn btn-ghost p-0"
        >
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            
          </Link>
        </motion.div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <motion.ul 
          className="menu menu-horizontal px-1 gap-1"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link, index) => (
            <motion.li key={index} variants={itemVariants}>
              <Link 
                to={link.path} 
                className="relative px-4 py-2 font-medium hover:text-primary transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="navbar-end flex gap-2 sm:gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle p-2"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </motion.button>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/login" className="btn btn-ghost gap-2">
            <FiUser />
            <span className="hidden sm:inline">Sign In</span>
          </Link>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/become-rider" className="btn btn-primary gap-2">
            <FaMotorcycle />
            <span className="hidden sm:inline">Be Rider</span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;