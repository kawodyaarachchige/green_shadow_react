import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import Crops from './pages/Crops';
import Staff from './pages/Staff';
import Vehicles from './pages/Vehicles';
import Equipment from './pages/Equipment';
import Logs from './pages/Logs';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                      <Navbar />
                      <div className="p-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/fields" element={<Fields />} />
                          <Route path="/crops" element={<Crops />} />
                          <Route path="/staff" element={<Staff />} />
                          <Route path="/vehicles" element={<Vehicles />} />
                          <Route path="/equipment" element={<Equipment />} />

                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;