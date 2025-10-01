import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryList } from './CategoryList';
import { ProductList } from './ProductList';
import { GalleryImages } from './GalleryImages';
import { EnquiriesList } from './Enquirieslist';
import OrdersPage from './OrdersList';
import { Menu } from 'lucide-react';

export default function AdminDashboard() {
  const isAuthenticated = !!Cookies.get('access_token');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-yellow-200">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <Button
          variant="ghost"
          className="flex items-center px-2 py-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} strokeWidth={2} />
        </Button>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`bg-yellow-200 text-black p-4 fixed sm:static top-0 left-0 bottom-0 z-40 w-64 overflow-y-auto transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        style={{ height: "100vh" }}
      >
        <div className="sm:hidden flex justify-end mb-4">
          <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
            Close
          </Button>
        </div>
        <nav className="space-y-2">
          <Link to="/admin/products" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
          </Link>
          <Link to="/admin/categories" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Categories
            </Button>
          </Link>
          <Link to="/admin/gallery" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Gallery Images
            </Button>
          </Link>
          <Link to="/admin/orders" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Orders
            </Button>
          </Link>
          <Link to="/admin/enquiries" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Enquiries
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setSidebarOpen(false);
              logout();
            }}
          >
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 overflow-auto mt-4 sm:mt-0 ">
        <Routes>
          <Route path="products" element={<ProductList />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="gallery" element={<GalleryImages />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="enquiries" element={<EnquiriesList />} />
          <Route path="*" element={<Navigate to="/admin/products" replace />} />
        </Routes>
      </main>
    </div>
  );
}