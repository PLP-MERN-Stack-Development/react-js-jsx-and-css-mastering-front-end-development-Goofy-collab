import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;