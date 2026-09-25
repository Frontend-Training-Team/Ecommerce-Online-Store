import { useLocation, Link } from 'react-router-dom';
import { Check, Package, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  const location = useLocation();
  const rawId = location.state?.orderId;
  const orderId = rawId ? String(rawId).slice(-8) : 'N/A';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-center dark:bg-noir-900">

      {/* Circle Icon Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-16 h-16 bg-[#e6f4ea] dark:bg-state-success/10 text-[#1e8e3e] dark:text-state-success 
        rounded-full flex items-center justify-center mb-6">
        <Check className="w-8 h-8 stroke-[2.5]" />
      </motion.div>

      {/* Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-2xl sm:text-3xl font-bold text-[#2d2421] dark:text-fg mb-2">
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-xs sm:text-sm text-[#8c7b70] dark:text-fg-tertiary mb-2">
        Thank you for your purchase. Your order has been confirmed.
      </motion.p>

      {/* Order ID */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="text-xs font-medium text-[#8c7b70] dark:text-fg-tertiary mb-8">
        Order ID: <span className="text-[#c07a50] dark:text-copper-400 font-semibold">#{orderId}</span>
      </motion.p>

      {/* Buttons Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">

        {/* Track My Order Button */}
        <Link
          to={`/orders/${rawId}`}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#c07a50] dark:border-copper-600 
          bg-transparent text-[#c07a50] dark:text-copper-400 hover:bg-[#c07a50]/5 dark:hover:bg-copper-400/5 
          font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Package className="w-4 h-4" />
          <span>Track My Order</span>
        </Link>

        {/* Continue Shopping Button */}
        <Link
          to="/shop"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#c07a50] dark:bg-copper-500 hover:bg-[#ad6a42] 
          dark:hover:bg-copper-400 text-white dark:text-fg-on-accent font-semibold text-xs flex items-center 
          justify-center gap-2 transition-colors shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

      </motion.div>

    </div>
  );
}
