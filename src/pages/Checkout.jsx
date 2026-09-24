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
  const { cartItems, loading: loadingCart, clearCart } = useCart();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in first to proceed to checkout');
      navigate('/Login');
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + shipping + tax;

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8c7b70] text-sm font-medium">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 xl:mt-17 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE1DB] pb-5 dark:border-[#2e2724]">
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