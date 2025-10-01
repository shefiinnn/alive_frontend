import { useEffect, useState } from 'react';
import api from '../../utils/api';

export function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<any>({ name: '', description: '', price: '', category: '', image: null });
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      fetchProducts();
    };
    loadData();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    api.get('products/')
      .then((res: any) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to fetch products');
        console.error(err);
        setLoading(false);
      });
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('categories/');
      setCategories(res.data);
      console.log('Fetched categories:', res.data); 
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleCreate = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;
    setError(null);

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    api.post('products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setNewProduct({ name: '', description: '', price: '', category: '', image: null });
        fetchProducts();
      })
      .catch((err: any) => {
        setError('Failed to create product');
        console.error(err);
      });
  };

  const handleUpdate = () => {
    if (!editingProduct || !newProduct.name || !newProduct.price || !newProduct.category) return;
    setError(null);

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    api.put(`products/${editingProduct.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setNewProduct({ name: '', description: '', price: '', category: '', image: null });
        setEditingProduct(null);
        fetchProducts();
      })
      .catch((err: any) => {
        setError('Failed to update product');
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setError(null);
    api.delete(`products/${id}/`)
      .then(() => {
        fetchProducts();
      })
      .catch((err: any) => {
        setError('Failed to delete product');
        console.error(err);
      });
  };

  const startEditing = (prod: any) => {
    setEditingProduct(prod);
    setNewProduct({
      name: prod.name || '',
      description: prod.description || '',
      price: prod.price?.toString() || '',
      category: prod.category?.toString() || '',
      image: null
    });
  };

  const getCategoryName = (categoryId: any) => {
    const idToMatch = parseInt(categoryId, 10);
    const category = categories.find((cat: any) => parseInt(cat.id, 10) === idToMatch);
    console.log('Matching category for ID:', categoryId, 'Found:', category); 
    return category ? category.name : 'Unknown';
  };

  if (loading) return <p className="text-gray-600">Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
  <div className="p-4 bg-white rounded-lg shadow-md max-w-full sm:max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>

    <div className="overflow-x-auto mb-8">
      <table className="min-w-full table-auto  bg-white border border-gray-300 rounded-lg ">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-1/6">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-2/6">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-1/6">Price</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-1/6">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-1/6">Image</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod: any) => (
            <tr key={prod.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900 border-b">{prod.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900 border-b">{prod.description}</td>
              <td className="px-6 py-4 text-sm text-gray-900 border-b">{prod.price}</td>
              <td className="px-6 py-4 text-sm text-gray-900 border-b">{getCategoryName(prod.category)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 border-b">
                {prod.image && (
                  <img
                    src={prod.image}
                    alt="Product"
                    className="h-10 w-10 object-cover rounded"
                  />
                )}
              </td>
              <td className="px-6 py-4 text-sm border-b">
                <button
                  onClick={() => startEditing(prod)}
                  className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
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
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
        placeholder="Price"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="category"
        value={newProduct.category}
        onChange={handleInputChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {editingProduct ? (
        <button
          onClick={handleUpdate}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
      ) : (
        <button
          onClick={handleCreate}
          className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create
        </button>
      )}
    </div>
  </div>
);
}