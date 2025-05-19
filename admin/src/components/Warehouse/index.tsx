import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

type WarehouseStatus = 'ACTIVE' | 'INACTIVE';

interface WarehouseItem {
  name: string;
  location: string;
  status: WarehouseStatus;
}

const initialWarehouses: WarehouseItem[] = [
  { name: 'Warehouse A', location: 'Hanoi', status: 'ACTIVE' },
  { name: 'Warehouse B', location: 'HCM', status: 'INACTIVE' },
  { name: 'Warehouse C', location: 'Danang', status: 'ACTIVE' },
];

const statusStyle: Record<WarehouseStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  INACTIVE: 'bg-red-100 text-red-700',
};

const Warehouse: React.FC = () => {
  const [data, setData] = useState<WarehouseItem[]>(initialWarehouses);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [itemToEdit, setItemToEdit] = useState<{
    item: WarehouseItem;
    idx: number;
  } | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<WarehouseItem>({
    name: '',
    location: '',
    status: 'ACTIVE',
  });

  const handleSaveEdit = () => {
    if (!itemToEdit) return;
    setData((prev) =>
      prev.map((item, idx) =>
        idx === itemToEdit.idx ? { ...itemToEdit.item } : item
      )
    );
    setItemToEdit(null);
  };

  const handleDelete = (idx: number) => {
    setData((prev) => prev.filter((_, i) => i !== idx));
    setShowMenu(null);
  };

  const handleSaveAdd = () => {
    setData((prev) => [...prev, newItem]);
    setShowAddModal(false);
    setNewItem({ name: '', location: '', status: 'ACTIVE' });
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Warehouse List</h1>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={() => setShowAddModal(true)}
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
            {data.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
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
                              setItemToEdit({ item, idx });
                              setShowMenu(null);
                            }}
                            className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
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
                  value={itemToEdit.item.name}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      item: { ...itemToEdit.item, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.item.location}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      item: { ...itemToEdit.item, location: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={itemToEdit.item.status}
                  onChange={(e) =>
                    setItemToEdit({
                      ...itemToEdit,
                      item: {
                        ...itemToEdit.item,
                        status: e.target.value as WarehouseStatus,
                      },
                    })
                  }
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
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSaveAdd}
                disabled={!newItem.name || !newItem.location}
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

export default Warehouse;
