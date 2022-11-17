import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ReRoute from './components/ReRoute';
import Auth from './features/auth/Auth';
import ForgetPassword from './features/auth/ForgetPassword';
import ResetPassword from './features/auth/ResetPassword';
import AuthLayout from './features/layout/AuthLayout';
import Layout from './features/layout/Layout';
import Items from './features/pages/buyer/store/Items';
import Home from './features/pages/Home';
import NotFound from './features/pages/NotFound';
import ManageStore from './features/pages/seller/ManageStore';
import AddNewProduct from './features/pages/seller/products/AddNewProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout /> }>
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/forget-password' element={<ForgetPassword />} />
          <Route path='/auth/reset-password/:token' element={<ResetPassword />} />
        </Route>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/manage-store' element={<ManageStore />} />
          <Route path="/manage-store/new" element={<AddNewProduct />} />
          <Route path="/store" element={<Items />} />
          <Route path='/not-found' element={<NotFound />} />
        </Route>
        <Route path='*' element={<ReRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
