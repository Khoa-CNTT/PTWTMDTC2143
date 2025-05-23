import React from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Track: React.FC = () => {
  const customer = {
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    address: '123 Street, District 1, Ho Chi Minh City, Vietnam',
  };
  const products = [
    {
      name: 'LED Monitor With High Quality In The World',
      quantity: 1,
      price: 250,
      originalPrice: 300,
      image:
        'https://cdn.thewirecutter.com/wp-content/media/2023/07/4kmonitors-2048px-9794.jpg',
    },
    {
      name: 'Magic Pen for iPad',
      quantity: 1,
      price: 50,
      originalPrice: 60,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzAnk3mCIUb-yIQfefy2q8PgxnqhCbcgDzWg&s',
    },
  ];

  const paymentMethod = 'Cash on Delivery (COD)';

  const originalTotal = products.reduce(
    (sum, p) => sum + (p.originalPrice || p.price) * (p.quantity || 1),
    0
  );
  const total = products.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );
  const discountTotal = originalTotal - total;
  const orderDate = new Date();
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-gray-800 text-white text-center py-12 w-full">
        <h1 className="text-3xl font-bold">Track Your Order</h1>
        <p className="text-gray-300 mt-2">
          Enter your order ID to see the delivery status and order details.
        </p>
      </div>

      <div className="flex justify-center -mt-10 w-full max-w-3xl">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full flex items-center gap-4">
          <TextField
            label="Order ID"
            placeholder="Enter your order ID"
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: 'orange', whiteSpace: 'nowrap' }}
          >
            Track Order
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-[1200px] mt-8">
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-2/3 flex flex-col justify-between h-full">
          <div>
            <p className="font-semibold mb-2">Order ID</p>
            <p className="font-bold text-lg">#2414151542523523523</p>
            <p className="text-sm text-gray-600 mt-1">
              Delivery Address: 123 Le Duan Street, Hai Chau, Da Nang
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Ordered on: {orderDate.toLocaleString()}
            </p>
            <div className="mt-4 mb-4">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 mb-2 border-b pb-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      Original Price: ${product.originalPrice}
                    </div>
                    <div className="text-sm text-gray-700">
                      Discounted Price: ${product.price}
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-2 mt-4 pt-2 font-semibold text-lg">
                <div className="flex justify-between items-center">
                  <span>Original Total</span>
                  <span className="text-gray-500 line-through">
                    ${originalTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount</span>
                  <span>-${discountTotal}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span>Total Payment</span>
                  <span className="text-red-500">${total}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold">Payment Method:</p>
                  <p className="">{paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="contained"
            color="warning"
            startIcon={<FileDownloadIcon />}
            className="mt-4"
          >
            Download PDF
          </Button>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-1/3">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <div className="space-y-1 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Name:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {customer.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {customer.address}
              </p>
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-4">Order Status Timeline</h2>
          <div className="relative pl-8 border-l-2 border-orange-500">
            {[
              'Order Delivered',
              'Shipping In Progress',
              'Payment Successful',
              'Order Created',
            ].map((status, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-5 top-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-semibold">{status}</h3>
                <p className="text-gray-500 text-sm">
                  This is an automated update from the system.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date().toDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
