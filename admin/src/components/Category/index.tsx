import React, { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  parentId?: number | null;
}

const initialCategories: Category[] = [
  { id: 1, name: 'Phone', description: 'Smartphone products', parentId: null },
  {
    id: 2,
    name: 'Laptop',
    description: 'Various laptop models',
    parentId: null,
  },
  {
    id: 3,
    name: 'Accessories',
    description: 'Headphones, chargers, cases...',
    parentId: null,
  },
];

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [parentId, setParentId] = useState<number | null>(null);
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
        parentId,
      };
      setCategories((prev) => [...prev, newItem]);
    }

    setNewCategory({ name: '', description: '' });
    setParentId(null);
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setNewCategory({ name: cat.name, description: cat.description });
    setParentId(cat.parentId ?? null);
  };

  const handleAddChild = (cat: Category) => {
    setParentId(cat.id);
    setEditingId(null);
    setNewCategory({ name: '', description: '' });
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCategoryToDelete(null);
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };
  const buildTree = (
    parentId: number | null = null,
    level = 0
  ): React.ReactNode => {
    return filteredCategories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => {
        const isExpanded = expandedCategories.includes(cat.id);
        const hasChildren = filteredCategories.some(
          (child) => child.parentId === cat.id
        );

        return (
          <React.Fragment key={cat.id}>
            <div
              className="flex items-center justify-between bg-white rounded border px-4 py-2 shadow-sm"
              style={{ marginLeft: `${level * 20}px` }}
            >
              <div className="flex items-center space-x-2">
                {hasChildren && (
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
                <span className="font-medium">{cat.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAddChild(cat)}
                  className="text-green-600 hover:text-green-800"
                  title="Add Subcategory"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => setCategoryToDelete(cat)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            {isExpanded && buildTree(cat.id, level + 1)}
          </React.Fragment>
        );
      });
  };

  return (
    <div className="p-6">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>
        <div className="flex justify-between items-start gap-6">
          <div className="w-1/3 bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h2>
            {parentId && !editingId && (
              <p className="text-sm text-gray-600 mb-2">
                Adding subcategory of:{' '}
                <strong>
                  {categories.find((c) => c.id === parentId)?.name}
                </strong>
              </p>
            )}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Description"
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
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>

          <div className="w-2/3">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
            </div>
            <div className="space-y-2">
              {filteredCategories.length === 0 ? (
                <div className="text-gray-500 text-center py-4">
                  No categories found.
                </div>
              ) : (
                buildTree()
              )}
            </div>
          </div>
        </div>
      </div>

      {categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete the category{' '}
              <strong>{categoryToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(categoryToDelete.id)}
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

export default Category;
