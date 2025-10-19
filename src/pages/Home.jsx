import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, manage, and organize your tasks efficiently with our intuitive task manager.',
      link: '/tasks',
    },
    {
      title: 'Daily Advice',
      description: 'Browse and search through helpful life advice and tips to inspire your day.',
      link: '/api-data',
    },
    {
      title: 'Dark Mode',
      description: 'Switch between light and dark themes for comfortable viewing in any environment.',
      link: '/',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to PLP Task Manager
        </h1>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          A modern, responsive task management application built with React and Tailwind CSS
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/tasks">
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/api-data">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              View API Data
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                {feature.link !== '/' && (
                  <Link to={feature.link}>
                    <Button variant="primary" size="sm">
                      Learn More
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Card title="Project Stats" variant="primary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Responsive
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              React
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Framework
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              Tailwind
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              CSS
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              Fast
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Performance
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;