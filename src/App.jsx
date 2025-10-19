import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import ApiData from './pages/ApiData';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="api-data" element={<ApiData />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


