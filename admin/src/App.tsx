import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import SignInPage from './pages/SignInPage';
import ProductView from './components/ProductView';
import ProductList from './components/ProductList';
import ProductUpload from './components/ProductUpload';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/product-view" element={<ProductView />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-upload" element={<ProductUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
