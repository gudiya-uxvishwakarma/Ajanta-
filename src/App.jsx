import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import HomeNew from './pages/HomeNew'
import Shop from './pages/Shop'
import AboutBrand from './pages/AboutBrand'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Orders from './pages/Orders'
import Wallet from './pages/Wallet'
import Vouchers from './pages/Vouchers'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TrackOrder from './pages/TrackOrder'
import ReturnExchange from './pages/ReturnExchange'
import WarrantyPolicy from './pages/WarrantyPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsConditions from './pages/TermsConditions'
import FAQs from './pages/FAQs'


if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/*" element={<StoreFront />} />
      </Routes>
    </BrowserRouter>
  )
}

function StoreFront() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/home-old" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutBrand />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/return-exchange" element={<ReturnExchange />} />
          <Route path="/warranty-policy" element={<WarrantyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


