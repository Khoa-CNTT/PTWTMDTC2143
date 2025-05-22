import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';
import Rating from '@mui/material/Rating';
import { productService, Product } from '../../services/productService';
import { categoryService, Category } from '../../services/categoryList';
import { brandService, Brand } from '../../services/brandService';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [variantStatus, setVariantStatus] = useState('Active');
  const [variantImages, setVariantImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [, setSelectedVariantProduct] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [editData, setEditData] = useState({
    id: '',
    name: '',
    category: '',
    brand: '',
    price: '',
    rating: '',
    status: '',
    images: [] as string[],
  });

  useEffect(() => {
    fetchProducts();
    // Fetch categories and brands
    (async () => {
      try {
        const [cat, br] = await Promise.all([
          categoryService.getAllCategories(),
          brandService.getAllBrands(),
        ]);
        setCategories(cat);
        setBrands(br);
      } catch (e) {
        toast.error('Lỗi khi tải danh mục hoặc thương hiệu');
      }
    })();
  }, []);

  const fetchProducts = async (cursor?: string) => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts(); // No arguments
      if (cursor) {
        setProducts((prev) => [...prev, ...response.products]);
      } else {
        setProducts(response.products);
      }
      setNextCursor(response.nextCursor || undefined); // Use undefined if null
      setHasMore(!!response.nextCursor);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      await fetchProducts(nextCursor);
    } catch (error) {
      console.error('Error loading more products:', error);
      toast.error('Lỗi khi tải thêm sản phẩm');
    } finally {
      setIsLoadingMore(false);
    }
  };

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

  const handleAddVariantClick = (productId: number) => {
    setProductId(productId.toString());
    setSelectedVariantProduct(productId);
    setShowVariantForm(true);
  };

  const handleEditClick = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditData({
        id: product.id,
        name: product.title,
        category: product.category?.id || '', // Use ID
        brand: product.brand?.id || '', // Use ID
        price: product.variants?.[0]?.price?.toString() || '',
        rating: product.rating?.toString() || '',
        status: product.variants?.[0]?.status || '',
        images: product.images?.map((img) => img.imageUrl) || [],
      });
      setShowForm(true);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await productService.updateProduct(editData.id, {
        title: editData.name,
        category: {
          id: editData.category,
          name: categories.find((c) => c.id === editData.category)?.name || '',
          image:
            categories.find((c) => c.id === editData.category)?.image || '',
        },
        brand: {
          id: editData.brand,
          name: brands.find((b) => b.id === editData.brand)?.name || '',
        },
        variants: [
          {
            id:
              products.find((p) => p.id === editData.id)?.variants?.[0]?.id ||
              '',
            price: Number(editData.price),
            status: editData.status,
            images:
              products.find((p) => p.id === editData.id)?.variants?.[0]
                ?.images || [],
          },
        ],
        rating: Number(editData.rating),
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editData.id
            ? {
                ...p,
                title: editData.name,
                category:
                  categories.find((c) => c.id === editData.category) ||
                  p.category,
                brand: brands.find((b) => b.id === editData.brand) || p.brand,
                variants: [
                  {
                    id: p.variants?.[0]?.id || '',
                    price: Number(editData.price),
                    status: editData.status,
                    images: p.variants?.[0]?.images || [],
                  },
                ],
                rating: Number(editData.rating),
                images: editData.images.map((url, idx) => ({
                  imageUrl: url,
                  id: p.images?.[idx]?.id || String(idx),
                })),
              }
            : p
        )
      );
      setShowForm(false);
      toast.success('Cập nhật sản phẩm thành công!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Cập nhật sản phẩm thất bại!');
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((images) => {
        setEditData((prev) => ({
          ...prev,
          images: [...prev.images, ...images],
        }));
      });
    }
  };

  const handleRemoveEditImage = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleReplaceEditImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditData((prev) => ({
          ...prev,
          images: prev.images.map((img, i) =>
            i === index ? (ev.target?.result as string) : img
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVariantImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((images) => {
        setVariantImages((prev) => [...prev, ...images]);
      });
    }
  };

  const handleRemoveVariantImage = (index: number) => {
    setVariantImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReplaceVariantImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setVariantImages((prev) =>
          prev.map((img, i) =>
            i === index ? (ev.target?.result as string) : img
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );

  const handleStatusChange = async (productId: string, newStatus: string) => {
    try {
      await productService.updateProduct(productId, {
        variants: [
          {
            id:
              products.find((p) => p.id === productId)?.variants?.[0]?.id || '',
            price:
              products.find((p) => p.id === productId)?.variants?.[0]?.price ||
              0,
            status: newStatus,
            images:
              products.find((p) => p.id === productId)?.variants?.[0]?.images ||
              [],
          },
        ],
      });
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Failed to update product status. Please try again.');
    }
  };

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
              {isLoading && !products.length ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {product.images?.[0]?.imageUrl && (
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded border"
                        />
                      )}
                      <span>{product.title}</span>
                    </td>
                    <td className="px-4 py-2">{product.category?.name}</td>
                    <td className="px-4 py-2">{product.brand?.name}</td>
                    <td className="px-4 py-2">
                      {product.variants?.[0]?.price || 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      <Rating
                        value={product.rating || 0}
                        readOnly
                        size="small"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Badge
                        text={product.variants?.[0]?.status || 'Inactive'}
                        color={
                          product.variants?.[0]?.status === 'Active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-200 text-gray-500'
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Switch
                        checked={product.variants?.[0]?.status === 'Active'}
                        onChange={() => {
                          handleStatusChange(
                            product.id,
                            product.variants?.[0]?.status === 'Active'
                              ? 'Inactive'
                              : 'Active'
                          );
                        }}
                        color="primary"
                      />
                    </td>
                    <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer flex space-x-2">
                      <button onClick={() => handleEditClick(product.id)}>
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleAddVariantClick(Number(product.id))
                        }
                        className="text-blue-600 hover:underline"
                      >
                        AddVarian
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? 'Đang tải...' : 'Tải thêm'}
              </button>
            </div>
          )}
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
                  value={
                    products.find((p) => p.id.toString() === productId)
                      ?.title || ''
                  }
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <select
                  name="brand"
                  value={editData.brand}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select brand</option>
                  {brands.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  name="price"
                  type="number"
                  min={0}
                  value={editData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 || value === '') {
                      handleEditChange(e);
                    }
                  }}
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleEditImagesChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {editData.images && editData.images.length > 0 && (
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <div className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer">
                      <img
                        src={editData.images[0]}
                        alt="Thumbnail"
                        className="w-32 h-32 object-cover"
                        onClick={() =>
                          document
                            .getElementById(`edit-image-upload-input-0`)
                            ?.click()
                        }
                      />
                      <p className="text-sm text-center mt-2">Thumbnail</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveEditImage(0)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                      <input
                        id="edit-image-upload-input-0"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleReplaceEditImage(e, 0)}
                        className="hidden"
                      />
                    </div>
                    {editData.images.slice(1).map((img, idx) => (
                      <div
                        key={idx + 1}
                        className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`Image ${idx + 1}`}
                          className="w-16 h-16 object-cover"
                          onClick={() =>
                            document
                              .getElementById(
                                `edit-image-upload-input-${idx + 1}`
                              )
                              ?.click()
                          }
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveEditImage(idx + 1)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                        <input
                          id={`edit-image-upload-input-${idx + 1}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleReplaceEditImage(e, idx + 1)}
                          className="hidden"
                        />
                      </div>
                    ))}
                    <div
                      className="border border-dashed border-gray-300 rounded p-2 flex items-center justify-center cursor-pointer w-16 h-16"
                      onClick={() =>
                        document
                          .getElementById('edit-image-upload-input-add')
                          ?.click()
                      }
                    >
                      <span className="text-gray-400">Add Image</span>
                      <input
                        id="edit-image-upload-input-add"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleEditImagesChange}
                        className="hidden"
                      />
                    </div>
                  </div>
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
                  Product
                </label>
                <input
                  type="text"
                  value={
                    products.find((p) => p.id.toString() === productId)
                      ?.title || ''
                  }
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 || value === '') {
                      setPrice(value);
                    }
                  }}
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
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 || value === '') {
                      setCompareAtPrice(value);
                    }
                  }}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium mb-1">Weight</label>
                <input
                  type="number"
                  value={weight}
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 || value === '') {
                      setWeight(value);
                    }
                  }}
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
                  <option value="kg">kilos</option>
                  <option value="g">grams</option>
                  <option value="lbs">pounds</option>
                  <option value="oz">ounces</option>
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
            <div className="">
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleVariantImagesChange}
                className="w-full border rounded px-3 py-2"
              />
              {variantImages.length > 0 && (
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <div className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer">
                    <img
                      src={variantImages[0]}
                      alt="Thumbnail"
                      className="w-32 h-32 object-cover"
                      onClick={() =>
                        document
                          .getElementById(`variant-image-upload-input-0`)
                          ?.click()
                      }
                    />
                    <p className="text-sm text-center mt-2">Thumbnail</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariantImage(0)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      ✕
                    </button>
                    <input
                      id="variant-image-upload-input-0"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleReplaceVariantImage(e, 0)}
                      className="hidden"
                    />
                  </div>
                  {variantImages.slice(1).map((img, idx) => (
                    <div
                      key={idx + 1}
                      className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className="w-16 h-16 object-cover"
                        onClick={() =>
                          document
                            .getElementById(
                              `variant-image-upload-input-${idx + 1}`
                            )
                            ?.click()
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVariantImage(idx + 1)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                      <input
                        id={`variant-image-upload-input-${idx + 1}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleReplaceVariantImage(e, idx + 1)}
                        className="hidden"
                      />
                    </div>
                  ))}
                  <div
                    className="border border-dashed border-gray-300 rounded p-2 flex items-center justify-center cursor-pointer w-16 h-16"
                    onClick={() =>
                      document
                        .getElementById('variant-image-upload-input-add')
                        ?.click()
                    }
                  >
                    <span className="text-gray-400">Add Image</span>
                    <input
                      id="variant-image-upload-input-add"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleVariantImagesChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
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
