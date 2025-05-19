import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './index.css';

const ProductUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const [variants, setVariants] = useState<
    { attribute: string; values: string[] }[]
  >([]);
  const [newAttribute, setNewAttribute] = useState<string>('');
  const [newValues, setNewValues] = useState<string[]>([]);

  const handleAddVariant = () => {
    if (newAttribute.trim()) {
      setVariants([...variants, { attribute: newAttribute, values: [] }]);
      setNewAttribute('');
    }
  };

  const handleAddValue = (index: number) => {
    if (newValues[index]?.trim()) {
      const updatedVariants = [...variants];
      updatedVariants[index].values.push(newValues[index]);
      setVariants(updatedVariants);

      const updatedNewValues = [...newValues];
      updatedNewValues[index] = '';
      setNewValues(updatedNewValues);
    }
  };
  const handleNewValueChange = (index: number, value: string) => {
    const updatedNewValues = [...newValues];
    updatedNewValues[index] = value;
    setNewValues(updatedNewValues);
  };
  const handleDeleteVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleDeleteValue = (variantIndex: number, valueIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values.splice(valueIndex, 1);
    setVariants(updatedVariants);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedImages((prevImages) => [...prevImages, ...files]);
    }
  };
  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleReplaceImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = event.target.files[0];
      setUploadedImages((prevImages) =>
        prevImages.map((img, i) => (i === index ? newImage : img))
      );
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

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="label">Attribute</label>
                  <input
                    type="text"
                    value={newAttribute}
                    onChange={(e) => setNewAttribute(e.target.value)}
                    placeholder="Attribute name (e.g., Size, Color)"
                    className="input w-full"
                  />
                </div>
                <div className="flex items-center mt-6 gap-2">
                  <button
                    onClick={handleAddVariant}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>

              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded p-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div>
                      <label className="label">Attribute</label>
                      <div className="flex items-center gap-2">
                        <label className="input w-full">
                          <option>{variant.attribute}</option>
                        </label>
                        <button
                          onClick={() => handleDeleteVariant(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="label">Values</label>
                      <div className="flex flex-col gap-2">
                        {variant.values.map((value, valueIndex) => (
                          <div
                            key={valueIndex}
                            className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded px-3 py-1"
                          >
                            <span className="flex-1">{value}</span>
                            <button
                              onClick={() =>
                                handleDeleteValue(index, valueIndex)
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newValues[index] || ''}
                            onChange={(e) =>
                              handleNewValueChange(index, e.target.value)
                            }
                            placeholder="Add new value"
                            className="input w-full"
                          />
                          <button
                            onClick={() => handleAddValue(index)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="bg-white rounded shadow-lg p-6 w-[600px]">
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
              <div className="flex items-center gap-4">
                {uploadedImages.length > 0 ? (
                  <>
                    <div className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer">
                      <img
                        src={URL.createObjectURL(uploadedImages[0])}
                        alt="Thumbnail"
                        className="w-32 h-32 object-cover"
                        onClick={() =>
                          document
                            .getElementById(`image-upload-input-0`)
                            ?.click()
                        }
                      />
                      <p className="text-sm text-center mt-2">Thumbnail</p>
                      <button
                        onClick={() => handleDeleteImage(0)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                      <input
                        id="image-upload-input-0"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleReplaceImage(e, 0)}
                        className="hidden"
                      />
                    </div>
                    <div className="flex gap-2">
                      {uploadedImages.slice(1).map((file, index) => (
                        <div
                          key={index + 1}
                          className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index + 1}`}
                            className="w-16 h-16 object-cover"
                            onClick={() =>
                              document
                                .getElementById(
                                  `image-upload-input-${index + 1}`
                                )
                                ?.click()
                            }
                          />
                          <button
                            onClick={() => handleDeleteImage(index + 1)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                          >
                            ✕
                          </button>
                          <input
                            id={`image-upload-input-${index + 1}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleReplaceImage(e, index + 1)}
                            className="hidden"
                          />
                        </div>
                      ))}
                      <div
                        className="border border-dashed border-gray-300 rounded p-2 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          document.getElementById('image-upload-input')?.click()
                        }
                      >
                        <span className="text-gray-400">Add Image</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No images selected.</p>
                )}
              </div>
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
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
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
