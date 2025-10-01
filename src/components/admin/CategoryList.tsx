import { useEffect, useState } from 'react';
import api from '../../utils/api';

export function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    setError(null);
    api.get('categories/')
      .then((res: any) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to fetch categories');
        console.error(err);
        setLoading(false);
      });
  };

  const handleCreate = () => {
    if (!newCategoryName) return;
    setError(null);
    api.post('categories/', { name: newCategoryName })
      .then(() => {
        setNewCategoryName('');
        fetchCategories();
      })
      .catch((err: any) => {
        setError('Failed to create category');
        console.error(err);
      });
  };

  const handleUpdate = () => {
    if (!editingCategory || !newCategoryName) return;
    setError(null);
    api.put(`categories/${editingCategory.id}/`, { name: newCategoryName })
      .then(() => {
        setNewCategoryName('');
        setEditingCategory(null);
        fetchCategories();
      })
      .catch((err: any) => {
        setError('Failed to update category');
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    setError(null);
    api.delete(`categories/${id}/`)
      .then(() => {
        fetchCategories();
      })
      .catch((err: any) => {
        setError('Failed to delete category');
        console.error(err);
      });
  };

  const startEditing = (cat: any) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
  };

  if (loading) return <p className="text-gray-600 text-center py-8">Loading categories...</p>;
  if (error) return <p className="text-red-600 text-center py-8">{error}</p>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-full md:max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center">Categories</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider border-b">Name</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat: any) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900 border-b">{cat.name}</td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap border-b">
                  <button
                    onClick={() => startEditing(cat)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-3 sm:mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive input row */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category Name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {editingCategory ? (
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
}
