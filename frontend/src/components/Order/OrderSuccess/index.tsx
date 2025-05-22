import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-white px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <CheckCircle className="text-green-600 w-24 h-24 mb-6 drop-shadow-lg" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-extrabold text-green-700 mb-3"
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 max-w-md mb-8"
      >
        Thank you for your purchase! Your order has been received and is now
        being processed. You’ll receive an update when your items are on the
        way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <a
          href="/"
          className="px-5 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Back to Home
        </a>
        <a
          href="/track-order"
          className="px-5 py-2 rounded-full border border-green-600 text-green-700 hover:bg-green-100 transition"
        >
          View My Orders
        </a>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
