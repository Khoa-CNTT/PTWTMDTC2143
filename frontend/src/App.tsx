import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import ShoppingCart from './pages/ShoppingCart';
import ShippingDetail from './pages/ShippingDetail';
import RegisterAccount from './pages/RegisterAccount';
import TrackOrder from './pages/TrackOrder';
import Category from './pages/Category';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FAQPage from './pages/FAQPage';
import ForgotPassword from './pages/ForgotPassword';
import LoginAccount from './pages/LoginAccount';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/shipping-detail" element={<ShippingDetail />} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginAccount />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
