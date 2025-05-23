import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import ShoppingCart from './pages/ShoppingCart';
import ShippingDetail from './pages/ShippingDetail';
import RegisterAccount from './pages/RegisterAccount';
import TrackOrder from './pages/TrackOrder';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FAQPage from './pages/FAQPage';
import ForgotPassword from './pages/ForgotPassword';
import LoginAccount from './pages/LoginAccount';
import ProfilePage from './pages/ProfilePage';
import ChatbotPage from './components/ChatBox/chatBoxPage';
import WishlistPage from './pages/WishlistPage';
import { AuthProvider } from './contexts/AuthContext';
import OrderSuccessPage from './pages/OrderPage/OrderSuccessPage';
import OrderFailedPage from './pages/OrderPage/OrderFailedPage';
import OrderListPage from './pages/OrderPage/OrderListPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/shipping-detail" element={<ShippingDetail />} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/electric-ai" element={<ChatbotPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-failed" element={<OrderFailedPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
