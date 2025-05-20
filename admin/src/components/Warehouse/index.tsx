import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  warehouseService,
  Warehouse,
  WarehouseStatus,
} from '../../services/warehouseService';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const statusStyle: Record<WarehouseStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  INACTIVE: 'bg-red-100 text-red-700',
};

const WarehouseManager: React.FC = () => {
  const [data, setData] = useState<Warehouse[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Omit<Warehouse, 'id'>>({
    name: '',
    location: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const warehouses = await warehouseService.getAllWarehouses();
      setData(warehouses);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch warehouses';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!itemToEdit) return;

    try {
      setLoading(true);
      const updated = await warehouseService.updateWarehouse(itemToEdit.id, {
        name: itemToEdit.name,
        location: itemToEdit.location,
        status: itemToEdit.status,
      });

      setData((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setItemToEdit(null);
      toast.success('Warehouse updated successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || 'Failed to update warehouse';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await warehouseService.deleteWarehouse(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      setShowMenu(null);
      toast.success('Warehouse deleted successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || 'Failed to delete warehouse';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const created = await warehouseService.createWarehouse(newItem);
      setData((prev) => [...prev, created]);
      setShowAddModal(false);
      setNewItem({
        name: '',
        location: '',
        status: 'ACTIVE',
      });
      toast.success('Warehouse added successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || 'Failed to add warehouse';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && data.length === 0) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Warehouse List</h1>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={() => setShowAddModal(true)}
            disabled={loading}
          >
            ADD WAREHOUSE
          </button>
        </div>
        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">LOCATION</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="relative inline-block text-left">
                    <button
                      className="hover:bg-gray-200 p-2 rounded-full"
                      onClick={() =>
                        setShowMenu(showMenu === item.id ? null : item.id)
                      }
                      disabled={loading}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                    {showMenu === item.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowMenu(null)}
                          tabIndex={-1}
                        />
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
                          <button
                            onClick={() => {
                              setItemToEdit(item);
                              setShowMenu(null);
                            }}
                            className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {itemToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Edit Warehouse</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.name}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, name: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.location}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, location: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.status}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      status: e.target.value as WarehouseStatus,
                    })
                  }
                  disabled={loading}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setItemToEdit(null)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
                onClick={handleSaveEdit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Add Warehouse</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.location}
                  onChange={(e) =>
                    setNewItem({ ...newItem, location: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.status}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      status: e.target.value as WarehouseStatus,
                    })
                  }
                  disabled={loading}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowAddModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
                onClick={handleAddItem}
                disabled={loading || !newItem.name || !newItem.location}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseManager;
