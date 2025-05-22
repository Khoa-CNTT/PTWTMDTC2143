import React from 'react';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderFailed: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 to-white px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <XCircle className="text-red-600 w-24 h-24 mb-6 drop-shadow-lg" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-extrabold text-red-700 mb-3"
      >
        Order Failed
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 max-w-md mb-8"
      >
        Oops! Something went wrong while placing your order. Please try again
        later or contact our support team for assistance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <a
          href="/"
          className="px-5 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Back to Home
        </a>
        {/* <a
          href="/contact-support"
          className="px-5 py-2 rounded-full border border-red-600 text-red-700 hover:bg-red-100 transition"
        >
          Contact Support
        </a> */}
      </motion.div>
    </div>
  );
};

export default OrderFailed;
