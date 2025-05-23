import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { categoryService, Category } from '../../services/categoryList';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [parentId, setParentId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        const updated = await categoryService.updateCategory(
          editingId,
          newCategory
        );
        setCategories((prev) =>
          prev.map((cat) => (cat.id === editingId ? updated : cat))
        );
        toast.success('Category updated successfully');
      } else {
        const created = await categoryService.createCategory({
          ...newCategory,
          parentId,
        });
        setCategories((prev) => [...prev, created]);
        toast.success('Category created successfully');
      }

      setNewCategory({ name: '', description: '' });
      setEditingId(null);
      setParentId(null);
    } catch (err) {
      toast.error(
        editingId ? 'Failed to update category' : 'Failed to create category'
      );
    } finally {
      setLoading(false);
    }
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

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setCategoryToDelete(null);
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const buildTree = (
    parentId: string | null = null,
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

  if (loading && categories.length === 0) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <>
      <Toaster position="top-right" />
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
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
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
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-300"
                  onClick={() => handleDelete(categoryToDelete.id)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryManager;
