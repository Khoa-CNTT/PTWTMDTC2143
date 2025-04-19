import React, { useState } from 'react';
import { FaCloudUploadAlt, FaStar, FaRegStar } from 'react-icons/fa';
import './index.css';

const ProductUpload = () => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(3);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedImages((prevImages) => [...prevImages, ...files]);
    }
  };
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
              <select className="input">
                <option>None</option>
                <option>Brand A</option>
                <option>Brand B</option>
                <option>Brand C</option>
              </select>
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
              <label className="label">RAM</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="label">Color</label>
              <input type="text" className="input" />
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
          <div
            className="border border-dashed border-gray-300 bg-gray-50 rounded p-6 text-center mb-6 cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <div className="text-gray-400">
              <FaCloudUploadAlt className="mx-auto text-4xl mb-2" />
              image upload
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded w-full flex items-center justify-center gap-2"
          >
            <FaCloudUploadAlt />
            Publish and View
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Publish Confirmation</h2>
            <p className="mb-4">
              Are you sure you want to publish this product?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  alert('Product Published!');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mb-4 w-full border border-gray-300 rounded p-2"
            />
            <div className="mb-4">
              <h3 className="font-medium mb-2">Selected Images:</h3>
              <ul className="list-disc pl-5">
                {uploadedImages.map((file, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsImageModalOpen(false);
                  alert(`${uploadedImages.length} Images Uploaded!`);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
