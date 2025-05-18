import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';
import Rating from '@mui/material/Rating';

const ProductList = () => {
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [variantStatus, setVariantStatus] = useState('Active');
  const [, setImages] = useState<FileList | null>(null);

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [, setSelectedVariantProduct] = useState<number | null>(null);

  const [editData, setEditData] = useState({
    id: '',
    name: '',
    category: '',
    brand: '',
    price: '',
    rating: '',
    status: '',
    image: '',
  });
  const [products, setProducts] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Product ${String.fromCharCode(65 + (i % 26))}`,
      category: `Category ${(i % 3) + 1}`,
      brand: `Brand ${(i % 5) + 1}`,
      price: `$${(100 + i * 5).toFixed(2)}`,
      rating: '4',
      status: i % 3 === 0 ? 'Active' : 'Inactive',
      image: `https://i.pravatar.cc/40?img=${i + 3}`,
    }))
  );

  const attributeOptions = [
    { name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    { name: 'Color', values: ['Red', 'Blue', 'Black', 'White'] },
    { name: 'Material', values: ['Cotton', 'Polyester', 'Silk'] },
  ];

  type SelectedAttribute = {
    attribute: string;
    value: string;
  };

  const [productId, setProductId] = useState<string>('');
  const [price, setPrice] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >([{ attribute: '', value: '' }]);

  const handleAttributeChange = (index: number, value: string) => {
    const updated = [...selectedAttributes];
    updated[index].attribute = value;
    updated[index].value = '';
    setSelectedAttributes(updated);
  };

  const handleValueChange = (index: number, value: string) => {
    const updated = [...selectedAttributes];
    updated[index].value = value;
    setSelectedAttributes(updated);
  };

  const handleRemoveAttribute = (index: number) => {
    const updated = selectedAttributes.filter((_, i) => i !== index);
    setSelectedAttributes(updated);
  };

  const handleSave = () => {
    const variant = {
      productId,
      price,
      attributes: selectedAttributes,
    };
    console.log('Saving variant:', variant);
    setShowVariantForm(false);
  };

  const handleCancel = () => {
    setPrice('');
    setSelectedAttributes([{ attribute: '', value: '' }]);
    setShowVariantForm(false);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddVariantClick = (productId: number) => {
    setProductId(productId.toString());
    setSelectedVariantProduct(productId);
    setShowVariantForm(true);
  };

  const handleEditClick = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    if (product) {
      setEditData({
        id: product.id.toString(),
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price.replace('$', ''),
        rating: product.rating,
        status: product.status,
        image: product.image,
      });
      setShowForm(true);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id.toString() === editData.id
          ? {
              ...product,
              name: editData.name,
              category: editData.category,
              brand: editData.brand,
              price: `$${editData.price}`,
              rating: editData.rating,
              status: editData.status,
              image: editData.image,
            }
          : product
      )
    );
    setShowForm(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded shadow p-4 mb-4">
        <h1 className="text-2xl font-semibold">Product List</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { color: 'from-green-500 to-green-400', icon: <FaUser /> },
          { color: 'from-fuchsia-500 to-pink-400', icon: <FaShoppingCart /> },
          { color: 'from-blue-600 to-blue-400', icon: <IoBagHandleOutline /> },
        ].map((card, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-6 rounded-lg bg-gradient-to-r ${card.color} text-white`}
          >
            <div>
              <p className="font-semibold text-sm">Total Users</p>
              <h2 className="text-3xl font-bold">277</h2>
            </div>
            <div className="text-4xl opacity-50">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[500px]">
            <div>
              <label className="block text-sm font-medium mb-1">SHOW BY</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CATEGORY BY
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>None</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2 w-64"
            />
            <button
              onClick={() => navigate('/product-upload')}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="text-left w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2">UID</th>
                <th className="py-2 px-2">PRODUCT</th>
                <th className="py-2 px-2">CATEGORY</th>
                <th className="py-2 px-2">BRAND</th>
                <th className="py-2 px-2">PRICE</th>
                <th className="py-2 px-2">RATING</th>
                <th className="py-2 px-2">STATUS</th>
                <th className="py-2 px-2">STATUS CONTROL</th>
                <th className="py-2 px-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded border"
                      />
                    )}
                    <span>{product.name}</span>
                  </td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    <Rating
                      value={Number(product.rating) || 0}
                      readOnly
                      size="small"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Badge
                      text={product.status}
                      color={
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-500'
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Switch
                      checked={product.status === 'Active'}
                      onChange={() => {
                        setProducts((products) =>
                          products.map((p) =>
                            p.id === product.id
                              ? {
                                  ...p,
                                  status:
                                    p.status === 'Active'
                                      ? 'Inactive'
                                      : 'Active',
                                }
                              : p
                          )
                        );
                      }}
                      color="primary"
                    />
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer  flex space-x-2">
                    <button
                      onClick={() => handleEditClick(product.id.toString())}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleAddVariantClick(product.id)}
                      className="text-blue-600 hover:underline"
                    >
                      AddVarian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateBefore />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateNext />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label className="block text-sm font-medium mb-2">
                  Product
                </label>
                <input
                  name="name"
                  type="text"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <input
                  name="brand"
                  type="text"
                  value={editData.brand}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  name="price"
                  type="number"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <Rating
                  name="rating"
                  value={Number(editData.rating) || 0}
                  precision={1}
                  max={5}
                  onChange={(_, newValue) => {
                    setEditData((prev) => ({
                      ...prev,
                      rating: newValue ? newValue.toString() : '0',
                    }));
                  }}
                />
              </div>

              <div className=" md:col-span-2">
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setEditData((prev) => ({
                          ...prev,
                          image: ev.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {editData.image && (
                  <img
                    src={editData.image}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded mt-2 border"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showVariantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-3xl max-h-screen overflow-y-auto p-8 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create Variant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Product ID
                </label>
                <input
                  type="text"
                  value={productId}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Compare At Price
                </label>
                <input
                  type="number"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Weight</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Weight Unit
                </label>
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select unit</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className=" md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={variantStatus}
                  onChange={(e) => setVariantStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Available">Available</option>
                  <option value="Outofstock">Outofstock</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className=" md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Attributes
                </label>
                {selectedAttributes.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-2">
                    <select
                      value={item.attribute}
                      onChange={(e) =>
                        handleAttributeChange(index, e.target.value)
                      }
                      className="w-1/2 border px-3 py-2 rounded"
                    >
                      <option value="">Select attribute</option>
                      {attributeOptions.map((attr) => (
                        <option key={attr.name} value={attr.name}>
                          {attr.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={item.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      className="w-1/2 border px-3 py-2 rounded"
                      disabled={!item.attribute}
                    >
                      <option value="">Select value</option>
                      {attributeOptions
                        .find((opt) => opt.name === item.attribute)
                        ?.values.map((val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        ))}
                    </select>
                    {selectedAttributes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
