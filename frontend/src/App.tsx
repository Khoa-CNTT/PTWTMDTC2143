import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/ShoppingCart";
import ShippingDetail from "./pages/ShippingDetail";
import RegisterAccount from "./pages/RegisterAccount";
import TrackOrder from "./pages/TrackOrder";
import Category from "./pages/Category";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FAQPage from "./pages/FAQPage";
import ForgotPassword from "./pages/ForgotPassword";
import LoginAccount from "./pages/LoginAccount";
function App() {


  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
      <Routes>
        <Route path="/shipping-detail" element={<ShippingDetail />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterAccount />} />
      </Routes>
      <Routes>
        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>
      <Routes>
        <Route path="/category" element={<Category />} />
      </Routes>
      <Routes>
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <Routes>
        <Route path="/product-detail" element={<ProductDetailPage />} />
      </Routes>
      <Routes>
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginAccount/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>

    </>
  );
}

export default App;
