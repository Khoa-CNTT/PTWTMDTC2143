import React, { useState } from 'react';
import { FaStar, FaTrash, FaShareAlt, FaCartPlus } from 'react-icons/fa';

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: '1',
      name: 'ASUS ROG Flow Z13 (2023) Gaming Laptop Tablet',
      description:
        '13.4” QHD 165Hz, GeForce RTX 4050, Intel Core i9-13900H, 16GB LPDDR5, 1TB PCIe SSD, Wi-Fi 6E, Windows 11',
      price: 1021,
      image: 'https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_SL1500_.jpg',
      rating: 4,
      ratingCount: 124,
      addedAt: 'May 19, 2025',
    },
    {
      id: '2',
      name: 'ASUS ROG Strix G16 Gaming Laptop',
      description:
        '165Hz, NVIDIA RTX 4060, Intel Core i7-13650HX, 16GB DDR5, 1TB PCIe Gen4 SSD, Wi-Fi 6E, Windows 11',
      price: 1631,
      shipping: 8,
      image: 'https://m.media-amazon.com/images/I/41kjMvKK9mL._SS135_.jpg',
      rating: 4,
      ratingCount: 1898,
      addedAt: 'May 19, 2025',
    },
  ]);
  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="p-6 space-y-6 bg-gray-100  ">
      <div className=" bg-white mx-auto p-4 rounded-lg shadow-md w-[1200px]">
        <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">
            You have no products in your wishlist.
          </p>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-contain self-center sm:self-start"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-700">{item.description}</p>

                <div className="flex items-center gap-1 text-orange-500 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < item.rating ? 'text-orange-400' : 'text-gray-300'
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {item.ratingCount.toLocaleString()}
                  </span>
                </div>

                <div className="text-lg font-bold mt-2 text-gray-800">
                  {item.price.toLocaleString()} USD
                </div>
                {item.shipping && (
                  <div className="text-sm text-gray-500">
                    + {item.shipping.toLocaleString()} USD shipping
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Added at: {item.addedAt}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded flex items-center gap-2">
                    <FaCartPlus /> Add to Cart
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                    <FaShareAlt />
                  </button>
                  <button
                    className="bg-gray-100 hover:bg-red-100 px-3 py-1 rounded text-red-500"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
