import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import OrderListPage from './pages/OrderListPage';
import ProductUploadPage from './pages/ProductUploadPage';
import ProductListPage from './pages/ProductListPage';
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
import WarehousePage from './pages/WarehousePage';
import SignIn from './components/SignIn';
import { authService } from './services/auth.service';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <DashBoard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-list"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <ProductListPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-upload"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <ProductUploadPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-list"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <OrderListPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <OrderDetailsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <UserListPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-details/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <UserDetailsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice-list"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <InvoiceListPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice-details"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <InvoiceDetailsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/promotion"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PromoManagerPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <ReviewManagerPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <CategoryPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category-list"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <CategoryList />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/variant"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <VariantPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <InventoryPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/warehouse"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <WarehousePage />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
