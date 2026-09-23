import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CheckoutForm from '../components/ui/checkout/CheckoutForm';
import OrderSummary from '../components/ui/checkout/OrderSummary';
import { postPlaceOrder } from '../api/orders.api';
import { useCart } from '../context/CartContext';

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
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p className="text-[#8c7b70] text-sm font-medium">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 xl:mt-17 min-h-screen bg-[#faf8f5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="text-[#c07a50] text-2xl">⚡</span>
            <span className="text-[24px] font-bold text-[#2d2421]">Lamsa Store</span>
          </div>
          <h1 className="text-[20px] font-bold text-[#2d2421]">Complete Your Purchase</h1>
          <p className="text-[12px] text-[#8c7b70] mt-0.5">Please enter your shipping and delivery details</p>
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