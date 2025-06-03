import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from '@mui/material/Button';
import './index.css';
import {
  searchProductsByKeyword,
  Products,
} from '../../services/productsService';
import { Link } from 'react-router-dom';

const SearchBox: React.FC = () => {
  const popularKeywords = [
    'iPhone 15 Pro',
    'Laptop gaming',
    'Tai nghe Bluetooth',
    'Máy lọc không khí',
    'Tủ lạnh Samsung',
  ];
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Products[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (q: string) => {
    setSearching(true);
    const results = await searchProductsByKeyword(q, 8);
    setSearchResults(results);
    setSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      handleSearch(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="searchBox h-[44px] px-3 py-2 rounded-md flex items-center gap-2 transition-colors duration-300 border-2 border-gray-300 hover:border-gray-400 focus-within:border-gray-400 relative ml-20 mt-2"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        tabIndex={0}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for products..."
          className="w-full h-full bg-transparent outline-none border-none text-sm ml-1"
        />
        <Button className="searchBtn !absolute right-1 top-1.2 z-50 !min-w-[40px] h-[40px] !w-[40px] !rounded-full !text-black !p-0">
          <IoSearchSharp className="text-[#4e4e4e] text-[20px]" />
        </Button>
      </div>

      {focused && (
        <div
          className="ml-20 absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-md z-50 max-h-[300px] overflow-auto w-full min-w-0"
          style={{ width: '90%' }}
        >
          {/* Đảm bảo dropdown suggestion có cùng width với input */}
          {query.trim() === '' ? (
            <>
              <div className="ml-5 mb-2 text-gray-600 text-sm font-medium">
                Popular Searches
              </div>
              <ul className="ml-10 grid grid-cols-2 gap-2">
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
              {searching ? (
                <div className="text-sm text-gray-500 italic">Searching...</div>
              ) : searchResults.length > 0 ? (
                <ul className="divide-y">
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="py-2 flex items-center gap-3 hover:bg-gray-100 px-2 cursor-pointer"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className="flex items-center gap-3 w-full"
                      >
                        <img
                          src={
                            item.images?.[0]?.imageUrl ||
                            '/placeholder-image.jpg'
                          }
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.variants?.[0]?.price
                              ? `${item.variants[0].price.toLocaleString()}₫`
                              : ''}
                          </p>
                        </div>
                      </Link>
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
