import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './components/admin/AdminDashboard'; 
import Login from './components/admin/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css';
import { HomePage } from './components/Home/HomePage.tsx';
import { ProductsPage } from './components/Orders/Products.tsx';
import { CartPage } from './components/Orders/Cart.tsx';
import { CartProvider } from './components/Orders/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/*"  
            element={
              <ProtectedRoute>
                <AdminDashboard />  
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
