import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ShopPage from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import StoreLayout from "./components/Layout/StoreLayout";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import OrderDetailPage from "./pages/OrderDetail";
import MyOrdersPage from "./pages/MyOrders";
import ForgotPasswordPage from "./pages/ForgetPassword";
import ForgotPasswordVerifyOtp from "./pages/ForgotPasswordVerifyOtp";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import OrderSuccessPage from "./pages/OrderSuccess";
import ProfilePage from "./pages/Profile";
import VerifyOtpDetailsPage from "./pages/VerifyOtpDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route element={<StoreLayout />}>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<Navigate to="/shop" replace />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Guest pages */}
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpDetailsPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/login" element={<Navigate to="/Login" replace />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/forgot-password-verify-otp" element={<ForgotPasswordVerifyOtp />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          {/* Protected pages */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
          </Route>

        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#ffffff',
            color: '#000',
          },
        }}
      />

    </>
  );
}

export default App;