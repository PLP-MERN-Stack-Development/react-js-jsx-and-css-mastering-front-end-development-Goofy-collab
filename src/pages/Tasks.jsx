import React from 'react';
import TaskManager from '../components/TaskManager';

const Tasks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your daily tasks and stay productive
        </p>
      </div>
      
      <TaskManager />
    </div>
  );
};

export default Tasks;