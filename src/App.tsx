import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import AdminPage from './pages/admin';
import Cart from './pages/cart';
import { CartProvider } from './context/cartContext';
import { ConfigProvider } from 'antd';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import { UserProvider } from './context/userContext';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />}>
                <Route path="products" element={<ProductList searchTerm="" />} />
                <Route path="add-product" element={<AddProduct />} />
              </Route>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route path="products" element={<ProductList searchTerm="" />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </CartProvider>
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;