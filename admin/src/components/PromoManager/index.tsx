import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Discount, promoService, Voucher } from '../../services/promoService';

interface CombinedPromotion {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  type: 'discount' | 'voucher';
  minOrderValue?: number;
  maxDiscountValue?: number;
  usageLimit?: number;
  usedCount?: number;
  applyType?: 'ALL' | 'CATEGORY' | 'PRODUCT';
  categories?: string[];
  products?: string[];
}

const PromoManager: React.FC = () => {
  // const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [search, setSearch] = useState('');
  const [editingPromotion, setEditingPromotion] =
    useState<CombinedPromotion | null>(null);
  const [deletingPromotion, setDeletingPromotion] =
    useState<CombinedPromotion | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'discount' | 'voucher'>(
    'all'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);

  const [voucherData, setVoucherData] = useState<Voucher[]>([]);
  const [discountData, setDiscountData] = useState<Discount[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedPromotion[]>([]);

  const fetchPromotions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch vouchers and discounts in parallel
      const [voucherResponse, discountResponse] = await Promise.all([
        promoService.getAllVouchers(),
        promoService.getAllDiscounts(),
      ]);

      console.log(voucherResponse.data);
      console.log(voucherResponse.data);
      setVoucherData(voucherResponse.data);
      setDiscountData(discountResponse.data);
      setCombinedData([...voucherResponse.data, ...discountResponse.data]);
      console.log(combinedData);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Failed to fetch promotions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add useEffect to fetch data on mount
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // Add debug log for data changes
  useEffect(() => {
    console.log('Voucher Data:', voucherData);
    console.log('Discount Data:', discountData);
    console.log('Combined Data:', combinedData);
  }, [voucherData, discountData, combinedData]);

  // Add filtered data based on typeFilter
  const filteredData = useMemo(() => {
    if (!combinedData) return [];

    // First filter by type
    let filtered =
      typeFilter === 'all'
        ? combinedData
        : typeFilter === 'voucher'
          ? voucherData
          : discountData;

    // Then filter by search term if exists
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      filtered = filtered.filter((promo) =>
        promo.code?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [typeFilter, combinedData, voucherData, discountData, search]);

  // Add debug log for search
  useEffect(() => {
    console.log('Search term:', search);
    console.log('Filtered results:', filteredData?.length);
  }, [search, filteredData]);

  const handleAddClick = () => {
    setEditingPromotion({
      id: '',
      name: '',
      description: '',
      discount: 0,
      startDate: '',
      endDate: '',
      status: 'ACTIVE',
      type: 'discount',
    });
  };

  const handleSave = async () => {
    if (!editingPromotion) return;

    try {
      setIsLoading(true);
      setError(null);

      if (editingPromotion.type === 'voucher') {
        // Add new voucher
        const voucherData = {
          code: editingPromotion.code || '',
          discount: editingPromotion.discount,
          startDate: editingPromotion.startDate,
          endDate: editingPromotion.endDate,
          status:
            editingPromotion.status === 'EXPIRED'
              ? 'INACTIVE'
              : editingPromotion.status,
          type: 'PERCENTAGE' as const,
          minSpend: editingPromotion.minOrderValue || 0,
          maxDiscountValue: editingPromotion.maxDiscountValue || 0,
          usageLimit: editingPromotion.usageLimit || 0,
          applyType: editingPromotion.applyType || 'ALL',
          categories: editingPromotion.categories || [],
          products: editingPromotion.products || [],
        };
        await promoService.createVoucher(voucherData);
      } else {
        // Add new discount
        const discountData = {
          name: editingPromotion.name || '',
          description: editingPromotion.description || '',
          discount: editingPromotion.discount,
          startDate: editingPromotion.startDate,
          endDate: editingPromotion.endDate,
          status:
            editingPromotion.status === 'EXPIRED'
              ? 'INACTIVE'
              : editingPromotion.status,
          type: 'PERCENTAGE' as const,
          minSpend: editingPromotion.minOrderValue || 0,
          applyType: editingPromotion.applyType || 'ALL',
          categories: editingPromotion.categories || [],
          products: editingPromotion.products || [],
        };
        await promoService.createDiscount(discountData);
      }

      // Refresh data after adding
      await fetchPromotions();
      setEditingPromotion(null);
    } catch (err) {
      console.error('Error saving promotion:', err);
      setError('Failed to save promotion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, type: 'discount' | 'voucher') => {
    try {
      setIsLoading(true);
      setError(null);
      await promoService.deletePromotion(id, type);
      // setPromotions((prev) => prev.filter((p) => p.id !== id));
      setDeletingPromotion(null);
    } catch (err) {
      console.error('Error deleting promotion:', err);
      setError('Failed to delete promotion');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Promotion Management</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddClick}
          >
            <Plus size={20} />
            Add Promotion
          </button>
        </div>

        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={typeFilter}
            onChange={(e) => {
              const newType = e.target.value as 'all' | 'discount' | 'voucher';
              setTypeFilter(newType);
              alert(`Selected type: ${newType}`);
            }}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value="discount">Discount</option>
            <option value="voucher">Voucher</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID/Code</th>

                <th className="border px-4 py-2">Discount</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Details</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {promo.code || promo.id}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      {promo.discount}%
                      {promo.maxDiscountValue && (
                        <div className="text-xs text-gray-500">
                          Max: {promo.maxDiscountValue.toLocaleString()}đ
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {formatDate(promo.startDate)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {formatDate(promo.endDate)}
                    </td>
                    <td className="border px-4 py-2 text-center capitalize">
                      {promo.type}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          promo.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : promo.status === 'INACTIVE'
                              ? 'bg-gray-200 text-gray-500'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {promo.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      {promo.type === 'voucher' ? (
                        <div className="text-sm">
                          <div>
                            Min: {promo.minOrderValue?.toLocaleString()}đ
                          </div>
                          <div>
                            Used: {promo.usedCount}/{promo.usageLimit}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <div>{promo.applyType}</div>
                          {promo.categories && promo.categories.length > 0 && (
                            <div>Categories: {promo.categories.length}</div>
                          )}
                          {promo.products && promo.products.length > 0 && (
                            <div>Products: {promo.products.length}</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => setEditingPromotion(promo)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setDeletingPromotion(promo)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-500">
                    No promotions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingPromotion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              {editingPromotion.id ? 'Edit' : 'Add'} Promotion
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editingPromotion.name || ''}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={editingPromotion.discount}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      discount: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={editingPromotion.description || ''}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={editingPromotion.startDate}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={editingPromotion.endDate}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={editingPromotion.type}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      type: e.target.value as 'discount' | 'voucher',
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="discount">Discount</option>
                  <option value="voucher">Voucher</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editingPromotion.status}
                  onChange={(e) =>
                    setEditingPromotion({
                      ...editingPromotion,
                      status: e.target.value as
                        | 'ACTIVE'
                        | 'INACTIVE'
                        | 'EXPIRED',
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditingPromotion(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete the promotion{' '}
              <strong>
                {deletingPromotion.name || deletingPromotion.code}
              </strong>
              ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeletingPromotion(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() =>
                  handleDelete(deletingPromotion.id, deletingPromotion.type)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoManager;
