import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import StoreLayout from "./components/Layout/StoreLayout";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import OrderDetailPage from "./pages/OrderDetail";
import MyOrdersPage from "./pages/MyOrders";
import ForgotPasswordPage from "./pages/ForgetPassword";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import OrderSuccessPage from "./pages/OrderSuccess";
import ProfilePage from "./pages/Profile";
import VerifyOtpDetailsPage from "./pages/VerifyOtpDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { Toaster } from "react-hot-toast";
import ResetPasswordOtp from "./pages/ResetPasswordOtp"

function App() {
  return (
    <>
      <Routes>
        <Route element={<StoreLayout />}>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Guest pages */}
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/resetpasswordOtp" element={<ResetPasswordOtp />} />
          </Route>

          {/* Protected pages */}
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Route>
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