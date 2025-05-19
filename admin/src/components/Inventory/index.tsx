import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
type InventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

interface InventoryItem {
  variantId: string;
  sku: string;
  img: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  status?: InventoryStatus;
}

const Inventory: React.FC = () => {
  const initialData: InventoryItem[] = [
    {
      variantId: 'VAR-001',
      sku: 'SKU-001',
      img: 'https://i.pravatar.cc/40?img=11',
      warehouseId: 'WH-A',
      quantity: 120,
      reserved: 30,
      status: 'IN_STOCK',
    },
    {
      variantId: 'VAR-002',
      sku: 'SKU-002',
      img: 'https://i.pravatar.cc/40?img=12',
      warehouseId: 'WH-B',
      quantity: 10,
      reserved: 5,
      status: 'LOW_STOCK',
    },
    {
      variantId: 'VAR-003',
      sku: 'SKU-003',
      img: 'https://i.pravatar.cc/40?img=13',
      warehouseId: 'WH-C',
      quantity: 0,
      reserved: 2,
      status: 'OUT_OF_STOCK',
    },
    {
      variantId: 'VAR-004',
      sku: 'SKU-004',
      img: 'https://i.pravatar.cc/40?img=14',
      warehouseId: 'WH-A',
      quantity: 50,
      reserved: 0,
    },
  ];

  const [data, setData] = useState<InventoryItem[]>(initialData);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusStyle: Record<InventoryStatus, string> = {
    IN_STOCK: 'bg-green-100 text-green-700',
    LOW_STOCK: 'bg-yellow-100 text-yellow-700',
    OUT_OF_STOCK: 'bg-red-100 text-red-700',
  };

  const handleSaveEdit = () => {
    if (!itemToEdit) return;
    setData((prev) =>
      prev.map((item) =>
        item.variantId === itemToEdit.variantId &&
        item.warehouseId === itemToEdit.warehouseId
          ? { ...item, ...itemToEdit }
          : item
      )
    );
    setItemToEdit(null);
  };

  const handleDelete = (variantId: string, warehouseId: string) => {
    setData((prev) =>
      prev.filter(
        (item) =>
          !(item.variantId === variantId && item.warehouseId === warehouseId)
      )
    );
    setShowMenu(null);
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
  const warehouseOptions = [
    { id: 'WH-A', name: 'Warehouse A' },
    { id: 'WH-B', name: 'Warehouse B' },
    { id: 'WH-C', name: 'Warehouse C' },
  ];
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold mb-4">Inventory List</h1>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={() => setShowAddModal(true)}
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
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(item.variantId, item.warehouseId)
                            }
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
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
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
            title="First page"
          >
            <MdSkipPrevious size={22} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
            title="Previous page"
          >
            <MdOutlineNavigateBefore size={22} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
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
            title="Next page"
          >
            <MdOutlineNavigateNext size={22} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
            title="Last page"
          >
            <MdSkipNext size={22} />
          </button>
        </div>
      </div>
      {itemToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px] ">
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
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSaveEdit}
              >
                Save
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
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={() => {
                  setData((prev) => [...prev, { ...newItem }]);
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
                disabled={
                  !newItem.variantId ||
                  !newItem.warehouseId ||
                  newItem.quantity < 0 ||
                  newItem.reserved < 0 ||
                  !newItem.status
                }
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

export default Inventory;
