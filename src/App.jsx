import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import ProductPage from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import StoreLayout from "./components/Layout/storeLayout"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import OrderDetailPage from "./pages/OrderDetail"
import MyOrdersPage from "./pages/MyOrders"
import ForgotPasswordPage from "./pages/ForgetPassword"
import CartPage from "./pages/cart"
import WishlistPage from "./pages/Wishlist"
import CheckoutPage from "./pages/Checkout"
import PaymentPage from "./pages/Payment"
import OrderSuccessPage from "./pages/OrderSuccess"
import ProfilePage from "./pages/Profile"
import VerifyOtpDetailsPage from "./pages/VerifyOtpDetails"

function App() {

  return (
    <>
      <Routes>
        <Route element={<StoreLayout />}>
          {/*  Public route  */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* Guest routes  */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* User routes  */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/orders" element={<MyOrdersPage />} />
          <Route path="/profile/orders/:id" element={<OrderDetailPage />} />

          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f1a17',
            color: '#fff',
          },
        }}
      />

    </>
  )
}

export default App
