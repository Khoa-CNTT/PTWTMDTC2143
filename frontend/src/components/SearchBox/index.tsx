import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from '@mui/material/Button';
import './index.css';
const SearchBox: React.FC = () => {
  const productSuggestions = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: '34.990.000₫',
      image: '/images/iphone.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: '27.990.000₫',
      image: '/images/samsung.jpg',
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      price: '28.990.000₫',
      image: '/images/macbook.jpg',
    },
  ];
  const popularKeywords = [
    'iPhone 15 Pro',
    'Laptop gaming',
    'Tai nghe Bluetooth',
    'Máy lọc không khí',
    'Tủ lạnh Samsung',
  ];
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');

  const filteredProducts = productSuggestions.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="relative w-full">
      <div
        className="searchBox h-[44px] px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300 border-2 border-gray-300 hover:border-gray-400 focus-within:border-gray-400 relative w-full"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        tabIndex={0}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full h-full bg-transparent outline-none border-none text-sm ml-1"
        />
        <Button className="searchBtn !absolute right-1 top-1.2 z-50 !min-w-[40px] h-[40px] !w-[40px] !rounded-full !text-black !p-0">
          <IoSearchSharp className="text-[#4e4e4e] text-[20px]" />
        </Button>
      </div>

      {focused && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg border rounded-md z-50 p-4 max-h-[300px] overflow-auto">
          {query.trim() === '' ? (
            <>
              <div className="mb-2 text-gray-600 text-sm font-medium">
                Popular Searches
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {popularKeywords.map((kw, i) => (
                  <li
                    key={i}
                    className="text-sm text-black hover:underline cursor-pointer"
                  >
                    {kw}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="mb-2 text-gray-600 text-sm font-medium">
                Product Suggestions
              </div>
              {filteredProducts.length > 0 ? (
                <ul className="divide-y">
                  {filteredProducts.map((item) => (
                    <li
                      key={item.id}
                      className="py-2 flex items-center gap-3 hover:bg-gray-100 px-2 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No matching products found.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
