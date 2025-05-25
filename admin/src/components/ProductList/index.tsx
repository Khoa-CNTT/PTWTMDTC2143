import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
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

  const [total, setTotal] = useState(0);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts(
        currentPage,
        itemsPerPage
      );
      setProducts(response.products);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setIsLoading(false);
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

  const handleAddVariantClick = (productId: string) => {
    setProductId(productId);
    setSelectedVariantProduct(Number(productId));
    setShowVariantForm(true);
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!price) {
        toast.error('Please enter a price');
        return;
      }

      if (selectedAttributes.length === 0) {
        toast.error('Please select at least one attribute');
        return;
      }

      // Validate all selected attributes have values
      for (const attr of selectedAttributes) {
        if (!attr.attribute || !attr.value) {
          toast.error('Please select both attribute and value for all options');
          return;
        }
      }

      const formData = new FormData();

      // Add basic variant information
      formData.append('productId', productId);
      formData.append('price', price.toString());
      formData.append('compareAtPrice', compareAtPrice || price.toString());
      formData.append('weight', weight || '1');
      formData.append('weightUnit', 'KILOS');
      formData.append('dimensions', dimensions || '');
      formData.append('description', description || '');
      formData.append('status', 'AVAILABLE');

      // Add option values
      const optionValues = selectedAttributes.map((attr) => ({
        optionName: attr.attribute,
        value: attr.value,
      }));
      formData.append('optionValues', JSON.stringify(optionValues));

      // Add images
      variantImages.forEach((image) => {
        formData.append('images', image);
        f;
      });

      // Call API to create variant
      await productService.createVariant(formData);

      toast.success('Variant added successfully');

      // Reset form
      setPrice('');
      setCompareAtPrice('');
      setWeight('');
      setDimensions('');
      setDescription('');
      setSelectedAttributes([]);
      setVariantImages([]);
      setShowVariantForm(false);

      // Refresh product list
      fetchProducts();
    } catch (error) {
      console.error('Error saving variant:', error);
      toast.error('Failed to add variant');
    }
  };

  const handleCancel = () => {
    setPrice('');
    setSelectedAttributes([{ attribute: '', value: '' }]);
    setShowVariantForm(false);
  };

  const handleEditClick = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description || '');
      formData.append('categoryId', product.category?.id || '');
      formData.append('brandId', product.brand?.id || '');
      formData.append('rating', product.rating?.toString() || '0');

      if (product.variants?.[0]) {
        formData.append(
          'variants[0][price]',
          product.variants[0].price.toString()
        );
        formData.append(
          'variants[0][status]',
          product.variants[0].status || ''
        );
        if (product.variants[0].compareAtPrice) {
          formData.append(
            'variants[0][compareAtPrice]',
            product.variants[0].compareAtPrice.toString()
          );
        }
      }

      setEditData({
        id: product.id,
        name: product.title,
        category: product.category?.id || '',
        brand: product.brand?.id || '',
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
      const formData = new FormData();
      formData.append('title', editData.name);
      formData.append('categoryId', editData.category);
      formData.append('brandId', editData.brand);
      formData.append('rating', editData.rating);

      if (editData.price) {
        formData.append('variants[0][price]', editData.price);
      }
      if (editData.status) {
        formData.append('variants[0][status]', editData.status);
      }

      await productService.updateProduct(editData.id, formData);

      // Update local state
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editData.id
            ? {
                ...p,
                title: editData.name,
                category: categories.find((c) => c.id === editData.category),
                brand: brands.find((b) => b.id === editData.brand),
                variants: p.variants.map((v, idx) =>
                  idx === 0
                    ? {
                        ...v,
                        price: Number(editData.price),
                        status: editData.status,
                      }
                    : v
                ),
                rating: Number(editData.rating),
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
      const formData = new FormData();
      formData.append('variants[0][status]', newStatus);

      await productService.updateProduct(productId, formData);
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product status:', error);
      toast.error('Không thể cập nhật trạng thái sản phẩm. Vui lòng thử lại!');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleDeleteClick = async (productId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await productService.deleteProduct(productId);
        toast.success('Xóa sản phẩm thành công!');
        fetchProducts(); // Refresh danh sách sau khi xóa
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Xóa sản phẩm thất bại!');
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
          <button
            onClick={() => navigate('/admin/products/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Thêm sản phẩm
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
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
                  {products.map((product) => (
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
                        {product.variants?.[0]?.price ? (
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(product.variants[0].price)}
                            </span>
                            {product.variants[0].compareAtPrice &&
                              product.variants[0].compareAtPrice >
                                product.variants[0].price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                  }).format(product.variants[0].compareAtPrice)}
                                </span>
                              )}
                            {product.variants[0].compareAtPrice &&
                              product.variants[0].compareAtPrice >
                                product.variants[0].price && (
                                <span className="text-sm text-green-600">
                                  -
                                  {Math.round(
                                    (100 *
                                      (product.variants[0].compareAtPrice -
                                        product.variants[0].price)) /
                                      product.variants[0].compareAtPrice
                                  )}
                                  %
                                </span>
                              )}
                          </div>
                        ) : (
                          'N/A'
                        )}
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
                          onClick={() => handleAddVariantClick(product.id)}
                          className="text-blue-600 hover:underline"
                        >
                          AddVarian
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, total)} of {total} entries
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1 || isLoading}
                  className="text-gray-400 disabled:opacity-30"
                >
                  <MdSkipPrevious />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                  className="text-gray-400 disabled:opacity-30"
                >
                  <MdOutlineNavigateBefore />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={isLoading}
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 bg-gray-100'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || isLoading}
                  className="text-gray-400 disabled:opacity-30"
                >
                  <MdOutlineNavigateNext />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || isLoading}
                  className="text-gray-400 disabled:opacity-30"
                >
                  <MdSkipNext />
                </button>
              </div>
            </div>
          </>
        )}
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
