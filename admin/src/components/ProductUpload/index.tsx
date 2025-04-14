import React, { useState } from 'react';
import { FaCloudUploadAlt, FaStar, FaRegStar } from 'react-icons/fa';
import './index.css';

const ProductUpload = () => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(3);
  return (
    <div className="p-4 bg-gray-100 ">
      <div className="bg-white rounded shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold">Product Upload</h1>
      </div>

      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Product Name</label>
              <input type="text" className="input " />
            </div>

            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea className="input h-24 resize-none" />
            </div>

            <div>
              <label className="label">Category</label>
              <select className="input">
                <option>None</option>
                <option>Category 1</option>
              </select>
            </div>

            <div>
              <label className="label">Price</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="label">Old Price</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="label">Product Stock</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="label">Brand</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="label">Is Featured?</label>
              <select className="input">
                <option>None</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="label">Discount</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="font-medium">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hover || rating) >= star;
                  return (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-pointer text-2xl transition-colors"
                    >
                      {isFilled ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div>
          <h2 className="font-semibold text-lg mb-4">Media and Published</h2>
          <div className="border border-dashed border-gray-300 bg-gray-50 rounded p-6 text-center mb-6">
            <div className="text-gray-400">
              <FaCloudUploadAlt className="mx-auto text-4xl mb-2" />
              image upload
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded w-full flex items-center justify-center gap-2">
            <FaCloudUploadAlt />
            Publish and View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
