import React from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Track: React.FC = () => {
  const products = [
    {
      name: 'LED Monitor With High Quality In The World',
      quantity: 1,
      price: 250,
      image:
        'https://cdn.thewirecutter.com/wp-content/media/2023/07/4kmonitors-2048px-9794.jpg',
    },
    {
      name: 'Magic Pen for iPad',
      quantity: 1,
      price: 50,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzAnk3mCIUb-yIQfefy2q8PgxnqhCbcgDzWg&s',
    },
  ];
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-gray-800 text-white text-center py-12 w-full">
        <h1 className="text-3xl font-bold">Track Your Order</h1>
        <p className="text-gray-300 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
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
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between h-full">
          <div>
            <p className="font-semibold mb-2">Order ID</p>
            <p className="font-bold text-lg">#2414151542523523523</p>
            <div className="mt-4 mb-4">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center[] gap-4 mb-2 border-b pb-2"
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
                    <div className="text-sm text-gray-500">
                      Price: ${product.price}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 pt-2 font-semibold text-lg">
                <span>Total</span>
                <span>
                  $
                  {products.reduce(
                    (sum, p) => sum + p.price * (p.quantity || 1),
                    0
                  )}
                </span>
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
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-2/3">
          <div className="relative pl-8 border-l-2 border-orange-500">
            {[
              'Order Delivered',
              'On Shipping',
              'Payment Success',
              'Order Created',
            ].map((status, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-5 top-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-semibold">{status}</h3>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
