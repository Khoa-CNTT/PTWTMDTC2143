import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/ShoppingCart";
import ShippingDetail from "./pages/ShippingDetail";
import LoginCreateAccount from "./pages/LoginCreateAccount";
import TrackOrder from "./pages/TrackOrder";
import Category from "./pages/Category";
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
        <Route path="/login" element={<LoginCreateAccount />} />
      </Routes>
      <Routes>
        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>
      <Routes>
        <Route path="/category" element={<Category />} />
      </Routes>
      <Footer/>
    </BrowserRouter>

    </>
  );
}

export default App;
