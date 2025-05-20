import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import {
  inventoryService,
  InventoryItem,
  InventoryStatus,
} from '../../services/inventoryService';
import { toast } from 'react-hot-toast';

const Inventory: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const inventoryData = await inventoryService.getAllInventory();
      setData(inventoryData);
    } catch (err) {
      setError('Failed to fetch inventory data');
      toast.error('Failed to fetch inventory data');
    } finally {
      setLoading(false);
    }
  };

  const statusStyle: Record<InventoryStatus, string> = {
    IN_STOCK: 'bg-green-100 text-green-700',
    LOW_STOCK: 'bg-yellow-100 text-yellow-700',
    OUT_OF_STOCK: 'bg-red-100 text-red-700',
  };

  const handleSaveEdit = async () => {
    if (!itemToEdit) return;

    try {
      setLoading(true);
      const updated = await inventoryService.updateInventoryQuantity({
        variantId: itemToEdit.variantId,
        warehouseId: itemToEdit.warehouseId,
        quantity: itemToEdit.quantity,
        reserved: itemToEdit.reserved,
        status: itemToEdit.status,
      });

      setData((prev) =>
        prev.map((item) =>
          item.variantId === updated.variantId &&
          item.warehouseId === updated.warehouseId
            ? updated
            : item
        )
      );
      setItemToEdit(null);
      toast.success('Inventory updated successfully');
    } catch (err) {
      toast.error('Failed to update inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (variantId: string, warehouseId: string) => {
    try {
      setLoading(true);
      // Note: You'll need to add a delete endpoint to your API
      // await inventoryService.deleteInventory(variantId, warehouseId);
      setData((prev) =>
        prev.filter(
          (item) =>
            !(item.variantId === variantId && item.warehouseId === warehouseId)
        )
      );
      setShowMenu(null);
      toast.success('Inventory item deleted successfully');
    } catch (err) {
      toast.error('Failed to delete inventory item');
    } finally {
      setLoading(false);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<InventoryItem>({
    variantId: '',
    sku: '',
    img: 'https://i.pravatar.cc/40?img=15',
    warehouseId: '',
    quantity: 0,
    reserved: 0,
    status: undefined,
  });

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const created = await inventoryService.addProductToWarehouse({
        variantId: newItem.variantId,
        warehouseId: newItem.warehouseId,
        quantity: newItem.quantity,
        reserved: newItem.reserved,
        status: newItem.status,
      });

      setData((prev) => [...prev, created]);
      setShowAddModal(false);
      setNewItem({
        variantId: '',
        sku: '',
        img: 'https://i.pravatar.cc/40?img=15',
        warehouseId: '',
        quantity: 0,
        reserved: 0,
        status: undefined,
      });
      toast.success('Inventory item added successfully');
    } catch (err) {
      toast.error('Failed to add inventory item');
    } finally {
      setLoading(false);
    }
  };

  const warehouseOptions = [
    { id: 'WH-A', name: 'Warehouse A' },
    { id: 'WH-B', name: 'Warehouse B' },
    { id: 'WH-C', name: 'Warehouse C' },
  ];

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
          <h1 className="text-2xl font-semibold mb-4">Inventory List</h1>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={() => setShowAddModal(true)}
            disabled={loading}
          >
            ADD INVENTORY
          </button>
        </div>
        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="px-4 py-2">VARIANT ID</th>
              <th className="px-4 py-2">IMAGE</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">WAREHOUSE</th>
              <th className="px-4 py-2">QUANTITY</th>
              <th className="px-4 py-2">RESERVED</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={`${item.variantId}-${item.warehouseId}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-mono">{item.variantId}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.img}
                    alt={item.sku}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.warehouseId}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.reserved}</td>
                <td className="px-4 py-2">
                  {item.status ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${statusStyle[item.status]}`}
                    >
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                      Unknown
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="relative inline-block text-left">
                    <button
                      className="hover:bg-gray-200 p-2 rounded-full"
                      onClick={() => setShowMenu(showMenu === idx ? null : idx)}
                      disabled={loading}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                    {showMenu === idx && (
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
                            onClick={() =>
                              handleDelete(item.variantId, item.warehouseId)
                            }
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
        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1 || loading}
            className="text-gray-400 disabled:opacity-30"
            title="First page"
          >
            <MdSkipPrevious size={22} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="text-gray-400 disabled:opacity-30"
            title="Previous page"
          >
            <MdOutlineNavigateBefore size={22} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              disabled={loading}
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
            disabled={currentPage === totalPages || loading}
            className="text-gray-400 disabled:opacity-30"
            title="Next page"
          >
            <MdOutlineNavigateNext size={22} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="text-gray-400 disabled:opacity-30"
            title="Last page"
          >
            <MdSkipNext size={22} />
          </button>
        </div>
      </div>

      {itemToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h3 className="text-lg font-semibold mb-4">Edit Inventory Item</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Variant ID</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.variantId}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, variantId: e.target.value })
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Warehouse</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.warehouseId}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      warehouseId: e.target.value,
                    })
                  }
                  disabled={loading}
                >
                  <option value="">Select warehouse</option>
                  {warehouseOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Quantity</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setItemToEdit({ ...itemToEdit, quantity: value });
                    }
                  }}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Reserved</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.reserved}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setItemToEdit({ ...itemToEdit, reserved: value });
                    }
                  }}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.status || ''}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      status: e.target.value as InventoryStatus,
                    })
                  }
                  disabled={loading}
                >
                  <option value="">Select status</option>
                  <option value="IN_STOCK">IN STOCK</option>
                  <option value="LOW_STOCK">LOW STOCK</option>
                  <option value="OUT_OF_STOCK">OUT OF STOCK</option>
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
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h3 className="text-lg font-semibold mb-4">Add Inventory Item</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Variant ID</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.variantId}
                  onChange={(e) =>
                    setNewItem({ ...newItem, variantId: e.target.value })
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Warehouse</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.warehouseId}
                  onChange={(e) =>
                    setNewItem({ ...newItem, warehouseId: e.target.value })
                  }
                  disabled={loading}
                >
                  <option value="">Select warehouse</option>
                  {warehouseOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Quantity</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setNewItem({ ...newItem, quantity: value });
                    }
                  }}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Reserved</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.reserved}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setNewItem({ ...newItem, reserved: value });
                    }
                  }}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newItem.status || ''}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      status: e.target.value as InventoryStatus,
                    })
                  }
                  disabled={loading}
                >
                  <option value="">Select status</option>
                  <option value="IN_STOCK">IN STOCK</option>
                  <option value="LOW_STOCK">LOW STOCK</option>
                  <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => {
                  setShowAddModal(false);
                  setNewItem({
                    variantId: '',
                    sku: '',
                    img: 'https://i.pravatar.cc/40?img=15',
                    warehouseId: '',
                    quantity: 0,
                    reserved: 0,
                    status: undefined,
                  });
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
                onClick={handleAddItem}
                disabled={
                  loading ||
                  !newItem.variantId ||
                  !newItem.warehouseId ||
                  newItem.quantity < 0 ||
                  newItem.reserved < 0 ||
                  !newItem.status
                }
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

export default Inventory;
