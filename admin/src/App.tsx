import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import SignInPage from './pages/SignInPage';
import OrderListPage from './pages/OrderListPage';
import ProductUploadPage from './pages/ProductUploadPage';
import ProductListPage from './pages/ProductListPage';
import ProductViewPage from './pages/ProductViewPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/product-view" element={<ProductViewPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-upload" element={<ProductUploadPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
