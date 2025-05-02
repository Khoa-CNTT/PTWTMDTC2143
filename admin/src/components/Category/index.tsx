import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: 'Điện thoại',
    description: 'Các sản phẩm điện thoại thông minh',
  },
  { id: 2, name: 'Laptop', description: 'Máy tính xách tay đa dạng mẫu mã' },
  { id: 3, name: 'Phụ kiện', description: 'Tai nghe, cáp sạc, bao da...' },
];

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const handleSave = () => {
    if (!newCategory.name.trim()) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, ...newCategory } : cat
        )
      );
      setEditingId(null);
    } else {
      const newItem: Category = {
        id: Date.now(),
        ...newCategory,
      };
      setCategories((prev) => [...prev, newItem]);
    }

    setNewCategory({ name: '', description: '' });
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setNewCategory({ name: cat.name, description: cat.description });
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCategoryToDelete(null);
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>
        <div className="flex justify-between items-start gap-6">
          <div className="w-1/3 bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">
              {editingId ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tên danh mục"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Mô tả"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="border rounded px-3 py-2"
              />
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>

          <div className="w-2/3">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Tên danh mục</th>
                    <th className="border px-4 py-2 text-left">Mô tả</th>
                    <th className="border px-4 py-2 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{cat.name}</td>
                      <td className="border px-4 py-2">{cat.description}</td>
                      <td className="border px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(cat)} // Hiển thị bảng thông báo
                          className="text-red-600 hover:text-red-800"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-4 text-gray-500"
                      >
                        Không tìm thấy danh mục nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
            <p className="mb-4">
              Bạn có chắc muốn xóa danh mục{' '}
              <strong>{categoryToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Hủy
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(categoryToDelete.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
