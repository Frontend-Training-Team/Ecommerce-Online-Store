import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CheckoutForm from '../components/ui/checkout/CheckoutForm';
import OrderSummary from '../components/ui/checkout/OrderSummary';
import { postPlaceOrder } from '../api/orders.api';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, cartItems, loading: loadingCart, clearCart } = useCart();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in first to proceed to checkout');
      navigate('/Login');
    }
  }, [navigate]);

  const TAX_RATE = 0.14;
  const subtotal = Number(cart?.subtotal ?? cartItems.reduce((acc, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0));

  const discount = Number(cart?.discountAmount ?? 0);
  const coupon = cart?.coupon || null;
  const shipping = (subtotal > 0 && subtotal < 1000) ? 50 : 0;
  const taxableAmount = Math.max(subtotal - discount, 0);
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + shipping + tax;

  const handleOrderSubmit = async (formData) => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Please add products before placing an order.');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        country: formData.country || 'Egypt',
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode || '',
      },
      paymentMethod: 'cash',
      customerNote: formData.notes || '',
    };

    try {
      const response = await postPlaceOrder(orderPayload);
      const orderId = response?.data?.order?._id || response?.data?._id;

      await clearCart().catch(() => {});
      toast.success('Order placed successfully!');
      navigate('/order-success', { state: { orderId } });
    } catch (error) {
      console.error('Order placement failed:', error);
      const message =
        error.response?.data?.message || error.userMessage || 'Failed to place order. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-noir-900">
        <p className="text-[#8c7b70] dark:text-fg-tertiary text-sm font-medium">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 xl:mt-17 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans dark:bg-noir-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-line">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C2B6] bg-white text-[#5C4A3E] transition-all hover:bg-[#F5EFEA] hover:text-[#2D241E] active:scale-95 dark:border-line-strong dark:bg-noir-800 dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:border-line-hover dark:hover:text-fg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-Instrument text-[#2D241E] dark:text-fg">
                Checkout
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#8C7A6E] dark:text-fg-tertiary mt-1">
                Please enter your shipping and delivery details
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <CheckoutForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={handleOrderSubmit}
            />
          </div>
          <div className="lg:col-span-4">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              discount={discount}
              coupon={coupon}
              shipping={shipping}
              tax={tax}
              total={total}
              isSubmitting={isSubmitting}
              onPlaceOrder={handleSubmit(handleOrderSubmit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}