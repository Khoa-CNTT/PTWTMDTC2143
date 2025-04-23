import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import SignInPage from './pages/SignInPage';
import OrderListPage from './pages/OrderListPage';
import ProductUploadPage from './pages/ProductUploadPage';
import ProductListPage from './pages/ProductListPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListPage from './pages/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-upload" element={<ProductUploadPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/user-list" element={<UserListPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
