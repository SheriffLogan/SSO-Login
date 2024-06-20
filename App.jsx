import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectLayout from './components/Layout';
import LoginPage from './components/Login';
import ProtectedRoute from './auth/ProtectRoutes';
import Redirect from './components/Redirect';
import { UserProvider } from './context/UserProvider';
import secureLocalStorage from 'react-secure-storage';

const isAuthenticated = () => {
  const token = secureLocalStorage.getItem('accessToken');
  return !!token;
};


function App() {

  return (
  <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />
            }
          />
          <Route element ={<ProtectedRoute/>} >
          <Route path="/redirect" element={<Redirect />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProjectLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
