import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  discountService,
  Discount,
  DiscountCreateDTO,
} from '../../services/discountService';
import { ApplyType, DiscountStatus, DiscountType } from '@prisma/client';

const PromoManager: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deletingDiscount, setDeletingDiscount] = useState<Discount | null>(
    null
  );
  const [typeFilter, setTypeFilter] = useState<'all' | DiscountType>('all');
  const [addingDiscount, setAddingDiscount] = useState(false);
  const [newDiscount, setNewDiscount] = useState<DiscountCreateDTO>({
    discount: 0,
    type: DiscountType.PERCENTAGE,
    startDate: '',
    endDate: '',
    status: DiscountStatus.ACTIVE,
    applyType: ApplyType.ALL,
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await discountService.getAllDiscounts();
      setDiscounts(response);
    } catch (err) {
      setError('Failed to fetch discounts');
      console.error('Error fetching discounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiscounts = discounts.filter(
    (d) =>
      (typeFilter === 'all' || d.type === typeFilter) &&
      d.discount.toString().includes(search)
  );

  const handleAddClick = () => {
    setAddingDiscount(true);
  };

  const handleAddSave = async () => {
    try {
      const createdDiscount = await discountService.createDiscount(newDiscount);
      setDiscounts((prev) => [...prev, createdDiscount]);
      setAddingDiscount(false);
      setNewDiscount({
        discount: 0,
        type: DiscountType.PERCENTAGE,
        startDate: '',
        endDate: '',
        status: DiscountStatus.ACTIVE,
        applyType: ApplyType.ALL,
      });
    } catch (err) {
      console.error('Error creating discount:', err);
      setError('Failed to create discount');
    }
  };

  const handleAddCancel = () => {
    setAddingDiscount(false);
  };

  const handleEditClick = (discount: Discount) => {
    setEditingDiscount(discount);
  };

  const handleSave = async () => {
    if (editingDiscount) {
      try {
        const updatedDiscount = await discountService.updateDiscount(
          editingDiscount.id,
          {
            discount: editingDiscount.discount,
            type: editingDiscount.type,
            startDate: editingDiscount.startDate,
            endDate: editingDiscount.endDate,
            status: editingDiscount.status,
            applyType: editingDiscount.applyType,
            categories: editingDiscount.categories,
            products: editingDiscount.products,
          }
        );
        setDiscounts((prev) =>
          prev.map((d) => (d.id === updatedDiscount.id ? updatedDiscount : d))
        );
        setEditingDiscount(null);
      } catch (err) {
        console.error('Error updating discount:', err);
        setError('Failed to update discount');
      }
    }
  };

  const handleCancel = () => {
    setEditingDiscount(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await discountService.deleteDiscount(id);
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      setDeletingDiscount(null);
    } catch (err) {
      console.error('Error deleting discount:', err);
      setError('Failed to delete discount');
    }
  };

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Discount Management</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddClick}
          >
            <Plus size={20} />
            Add Discount
          </button>
        </div>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search discounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as 'all' | DiscountType)
            }
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value={DiscountType.PERCENTAGE}>Percentage</option>
            <option value={DiscountType.FIXED_AMOUNT}>Fixed Amount</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Discount</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Apply To</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {discount.type === DiscountType.PERCENTAGE
                      ? `${discount.discount}%`
                      : `$${discount.discount}`}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {discount.type.toLowerCase()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(discount.startDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(discount.endDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {discount.applyType.toLowerCase()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Badge
                      text={discount.status}
                      color={
                        discount.status === DiscountStatus.ACTIVE
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-200 text-gray-500'
                      }
                    />
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditClick(discount)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setDeletingDiscount(discount)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDiscounts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No discounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addingDiscount && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Add Discount</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  value={newDiscount.discount}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      discount: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newDiscount.type}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      type: e.target.value as DiscountType,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={DiscountType.PERCENTAGE}>Percentage</option>
                  <option value={DiscountType.FIXED_AMOUNT}>
                    Fixed Amount
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newDiscount.startDate}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
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
                  value={newDiscount.endDate}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Apply To
                </label>
                <select
                  value={newDiscount.applyType}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      applyType: e.target.value as ApplyType,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ApplyType.ALL}>All Products</option>
                  <option value={ApplyType.CATEGORY}>Categories</option>
                  <option value={ApplyType.PRODUCT}>Products</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newDiscount.status}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      status: e.target.value as DiscountStatus,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={DiscountStatus.ACTIVE}>Active</option>
                  <option value={DiscountStatus.INACTIVE}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleAddCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {editingDiscount && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Edit Discount</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  value={editingDiscount.discount}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
                      discount: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={editingDiscount.type}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
                      type: e.target.value as DiscountType,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={DiscountType.PERCENTAGE}>Percentage</option>
                  <option value={DiscountType.FIXED_AMOUNT}>
                    Fixed Amount
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={editingDiscount.startDate}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
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
                  value={editingDiscount.endDate}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Apply To
                </label>
                <select
                  value={editingDiscount.applyType}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
                      applyType: e.target.value as ApplyType,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ApplyType.ALL}>All Products</option>
                  <option value={ApplyType.CATEGORY}>Categories</option>
                  <option value={ApplyType.PRODUCT}>Products</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editingDiscount.status}
                  onChange={(e) =>
                    setEditingDiscount({
                      ...editingDiscount,
                      status: e.target.value as DiscountStatus,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={DiscountStatus.ACTIVE}>Active</option>
                  <option value={DiscountStatus.INACTIVE}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
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

      {deletingDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this discount?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeletingDiscount(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(deletingDiscount.id)}
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
