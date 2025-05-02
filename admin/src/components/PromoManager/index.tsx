import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Promotion {
  id: number;
  name: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
}

const initialPromotions: Promotion[] = [
  {
    id: 1,
    name: 'Summer Promotion 2025',
    description: 'Summer discount for all products',
    discount: 20,
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Black Friday',
    description: 'Year-end super sale',
    discount: 50,
    startDate: '2025-11-25',
    endDate: '2025-11-29',
    status: 'Inactive',
  },
];

const PromoManager: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [search, setSearch] = useState('');
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );
  const [deletingPromotion, setDeletingPromotion] = useState<Promotion | null>(
    null
  );
  const [addingPromotion, setAddingPromotion] = useState(false);
  const [newPromotion, setNewPromotion] = useState<Promotion>({
    id: Date.now(),
    name: '',
    description: '',
    discount: 0,
    startDate: '',
    endDate: '',
    status: 'Active',
  });

  const filteredPromotions = promotions.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleAddClick = () => {
    setAddingPromotion(true);
  };
  const handleAddSave = () => {
    setPromotions((prev) => [...prev, newPromotion]);
    setAddingPromotion(false);
    setNewPromotion({
      id: Date.now(),
      name: '',
      description: '',
      discount: 0,
      startDate: '',
      endDate: '',
      status: 'Active',
    });
  };

  const handleAddCancel = () => {
    setAddingPromotion(false);
  };
  const handleEditClick = (promo: Promotion) => {
    setEditingPromotion(promo);
  };

  const handleSave = () => {
    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((p) => (p.id === editingPromotion.id ? editingPromotion : p))
      );
      setEditingPromotion(null);
    }
  };

  const handleCancel = () => {
    setEditingPromotion(null);
  };

  const handleDelete = (id: number) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
    setDeletingPromotion(null);
  };

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );

  return (
    <div className="p-4">
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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search promotions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Discount (%)</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{promo.name}</td>
                  <td className="border px-4 py-2">{promo.description}</td>
                  <td className="border px-4 py-2 text-center">
                    {promo.discount}%
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {promo.startDate}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {promo.endDate}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Badge
                      text={promo.status}
                      color={
                        promo.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-200 text-gray-500'
                      }
                    />
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditClick(promo)}
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
              {filteredPromotions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No promotions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addingPromotion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Promotion</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newPromotion.name}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={newPromotion.description}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    description: e.target.value,
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
                value={newPromotion.discount}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    discount: Number(e.target.value),
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
                value={newPromotion.startDate}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    startDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={newPromotion.endDate}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    endDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={newPromotion.status}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    status: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
      {editingPromotion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Promotion</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={editingPromotion.name}
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
                Description
              </label>
              <textarea
                value={editingPromotion.description}
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
              <label className="block text-sm font-medium mb-1">End Date</label>
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
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editingPromotion.status}
                onChange={(e) =>
                  setEditingPromotion({
                    ...editingPromotion,
                    status: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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

      {deletingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete the promotion{' '}
              <strong>{deletingPromotion.name}</strong>?
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
                onClick={() => handleDelete(deletingPromotion.id)}
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
