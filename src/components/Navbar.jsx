import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Button from './Button';
import { FaSun, FaMoon } from "react-icons/fa";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Quotes', path: '/api-data' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                PLP Task Manager
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;