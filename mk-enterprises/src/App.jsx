import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import SearchPage from './pages/SearchPage'
import WishlistPage from './pages/WishlistPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './components/Login'
import ProductEdit from './pages/admin/ProductEdit'
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute'
import AdminProtectedRoute from './protectedRoutes/AdminProtectedRoute'
import {ToastContainer} from 'react-toastify'

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-root">
      {isAdminRoute ? (
        // Admin layout
        <>
          <div className="main-content">
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminProtectedRoute Component={AdminDashboard} />} />
              <Route path="/admin/edit/:id" element={<AdminProtectedRoute Component={ProductEdit} />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        // User layout
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<UserProtectedRoute Component={DetailPage} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<UserProtectedRoute Component={WishlistPage} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </div>
  );
}

export default App