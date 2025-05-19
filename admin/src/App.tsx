import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import OrderListPage from './pages/OrderListPage';
import ProductUploadPage from './pages/ProductUploadPage';
import ProductListPage from './pages/ProductListPage';
// import ProductViewPage from './pages/ProductViewPage'; // Uncomment if ProductViewPage exists
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListPage from './pages/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import InvoiceListPage from './pages/InvoiceListPage';
import PromoManagerPage from './pages/PromoManagerPage';
import ReviewManagerPage from './pages/ReviewManagerPage';
import CategoryPage from './pages/CategoryPage';
import CategoryList from './components/Category/categoryList';
import VariantPage from './pages/VariantPage';
import InventoryPage from './pages/InventoryPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-upload" element={<ProductUploadPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/user-list" element={<UserListPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/invoice-list" element={<InvoiceListPage />} />
          <Route path="/invoice-details" element={<InvoiceDetailsPage />} />
          <Route path="/promotion" element={<PromoManagerPage />} />
          <Route path="/review" element={<ReviewManagerPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/variant" element={<VariantPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
