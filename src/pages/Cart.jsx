import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineTrash,
  HiCheckCircle,
  HiXCircle,
  HiOutlineShoppingBag,
  HiOutlineTag,
  HiOutlineArrowLeft
} from 'react-icons/hi2';
import SweepingCleaner from '../components/Ui/Animation/SweepingCleaner';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      setIsLoading(true);
      try {
        const savedCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        if (savedCart.length === 0) {
          setCartItems([]);
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://e-commerce-api-3wara.vercel.app/products?limit=100');
        const data = await response.json();
        const allProducts = data.products || (Array.isArray(data) ? data : []);

        const detailedCart = savedCart.map((cartItem) => {
          const product = allProducts.find(
            (p) => String(p.id || p._id) === String(cartItem.productId)
          );

          if (product) {
            return {
              ...product,
              cartQuantity: cartItem.quantity || 1,
              maxStock: product.countInStock ?? product.stock ?? product.quantity ?? 10
            };
          }

          return {
            _id: cartItem.productId,
            name: 'Product Details Unavailable',
            price: 0,
            cartQuantity: cartItem.quantity || 1,
            maxStock: 5,
            images: ['https://via.placeholder.com/150']
          };
        });

        setCartItems(detailedCart);
      } catch (error) {
        showNotification('Failed to load cart items', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const updateLocalStorage = (updatedItems) => {
    const cartToSave = updatedItems.map((item) => ({
      productId: item._id || item.id,
      quantity: item.cartQuantity
    }));
    localStorage.setItem('guestCart', JSON.stringify(cartToSave));
  };

  const handleDeleteItem = (id) => {
    setDeletingId(id);

    setTimeout(() => {
      const updated = cartItems.filter((item) => (item._id || item.id) !== id);
      setCartItems(updated);
      updateLocalStorage(updated);
      setDeletingId(null);
      showNotification('Removed from cart', 'success');
    }, 1500);
  };

  const handleIncreaseQuantity = (id) => {
    const updated = cartItems.map((item) => {
      const itemId = item._id || item.id;
      if (itemId === id) {
        if (item.cartQuantity >= item.maxStock) {
          showNotification(
            `only ${item.maxStock} units available in stock`,
            'warning'
          );
          return item;
        }
        return { ...item, cartQuantity: item.cartQuantity + 1 };
      }
      return item;
    });

    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const handleDecreaseQuantity = (id) => {
    const targetItem = cartItems.find((item) => (item._id || item.id) === id);

    if (targetItem && targetItem.cartQuantity <= 1) {
      handleDeleteItem(id);
      return;
    }

    const updated = cartItems.map((item) => {
      const itemId = item._id || item.id;
      if (itemId === id) {
        return { ...item, cartQuantity: item.cartQuantity - 1 };
      }
      return item;
    });

    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.discountPrice || item.price || 0;
    return acc + price * item.cartQuantity;
  }, 0);
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-copper-700 dark:border-copper-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-slate-50/70 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            backgroundColor: toast.type === 'success' ? '#7A6E67' : '#7E4A2D'
          }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 backdrop-blur-xl 
  text-white text-sm font-medium px-5 py-3 rounded-2xl  pointer-events-none transition-all 
  animate-in slide-in-from-top-3 ease-out"
        >
          {toast.type === 'success' && <HiCheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />}
          {toast.type !== 'success' && <HiXCircle className="w-6 h-6 text-brand-200 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 transition-colors">
              <HiOutlineShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping and find something you love!
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#A8653F] hover:bg-copper-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition duration-200 shadow-md active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-copper-900 dark:text-slate-100 mb-8 mt-10">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-700/60 transition-colors">
                  {cartItems.map((item) => {
                    const id = item._id || item.id;
                    const price = item.discountPrice || item.price || 0;
                    const itemTotal = price * item.cartQuantity;
                    const imageUrl =
                      item.images?.[0]?.url ||
                      (typeof item.images?.[0] === 'string' ? item.images[0] : null) ||
                      item.image ||
                      'https://via.placeholder.com/150';

                    const isDeleting = deletingId === id;

                    return (
                      <div
                        key={id}
                        className={`py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-start transition-all duration-700 ${isDeleting ? 'opacity-40 scale-95 translate-x-4 blur-[1px]' : 'opacity-100 scale-100'
                          }`}
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base line-clamp-2">
                              {item.name || item.title}
                            </h3>

                            <button
                              onClick={() => handleDeleteItem(id)}
                              disabled={isDeleting}
                              className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition p-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 shrink-0 relative flex items-center justify-center"
                              title="Delete Item"
                            >
                              {isDeleting ? (
                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg">
                                  <SweepingCleaner className="w-9 h-9 sm:w-10 sm:h-10 text-copper-700 dark:text-copper-400 scale-110" />
                                </div>
                              ) : (
                                <HiOutlineTrash className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          <p className="text-copper-700 dark:text-copper-400 font-bold text-sm sm:text-base mt-1">
                            EGP {price.toLocaleString()}
                          </p>

                          <div className="flex justify-between items-center mt-4 gap-4 flex-wrap">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shrink-0">
                              <button
                                onClick={() => handleDecreaseQuantity(id)}
                                className="w-8 h-8 flex items-center justify-center text-copper-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-sm font-medium"
                              >   -
                              </button>
                              <span className="w-10 text-center text-xs sm:text-sm font-semibold text-copper-700 dark:text-copper-400">
                                {item.cartQuantity}
                              </span>
                              <button
                                onClick={() => handleIncreaseQuantity(id)}
                                className="w-8 h-8 flex items-center justify-center text-copper-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-sm font-medium"
                              >   +
                              </button>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base whitespace-nowrap ml-auto">
                              EGP {itemTotal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-6 shadow-sm transition-colors w-full">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm mb-3">
                    <HiOutlineTag className="w-5 h-5 text-copper-700 dark:text-copper-400 shrink-0" />
                    <span>Coupon Code</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="w-full sm:flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-copper-500/20 focus:border-copper-400 transition min-w-0"
                    />
                    <button className="w-full sm:w-auto shrink-0 px-5 py-2.5 border border-copper-400 text-copper-700 dark:text-copper-400 dark:border-copper-500 font-semibold text-sm rounded-xl hover:bg-copper-50 dark:hover:bg-copper-950/50 transition active:scale-95 cursor-pointer">
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/shop')}
                  className="inline-flex items-center gap-2 text-copper-700 dark:text-copper-400 font-medium text-sm hover:underline pt-2 cursor-pointer"
                >
                  <HiOutlineArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-sm sticky top-24 space-y-6 transition-colors">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Order Summary</h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        EGP {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free</span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Tax (14%)</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        EGP {tax.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-base">Total</span>
                      <span className="font-bold text-copper-700 dark:text-copper-400 text-xl">
                        EGP {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-copper-600 hover:bg-copper-700 text-white font-semibold py-3.5 rounded-xl transition active:scale-95">
                    Proceed to Checkout
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => navigate('/shop')}
                      className="inline-flex items-center gap-2 text-copper-700 dark:text-copper-400 font-medium text-sm hover:underline pt-2 cursor-pointer"
                    >
                      <span>Continue Shopping</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}