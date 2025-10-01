import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { AppNavbar } from '../Navbar';
import { Footer } from '../Footer';
import toast from 'react-hot-toast';
import { useCart } from '../Orders/CartContext';
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

export function ProductsPage() {
  const { cartItems, add, update } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search and category values from URL params
  const searchTerm = searchParams.get('search') || '';
  const selectedCategoryParam = searchParams.get('category');
  const selectedCategory = selectedCategoryParam ? Number(selectedCategoryParam) : '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<Category[]>('categories/');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await api.get<Product[]>('products/');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (selectedCategory !== '') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const getQuantity = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const incrementQuantity = (product: Product) => {
    const qty = getQuantity(product.id);
    if (qty === 0) {
      add({ id: product.id, name: product.name, image: product.image, price: Number(product.price) });
    } else {
      update(product.id, qty + 1);
    }
  };

  const decrementQuantity = (id: number) => {
    const qty = getQuantity(id);
    if (qty > 0) {
      update(id, qty - 1);
    }
  };

  const addToCart = (product: Product) => {
    const qty = getQuantity(product.id);
    if (qty === 0) {
      add({ id: product.id, name: product.name, image: product.image, price: Number(product.price) });
    }
    toast.success(`Added to cart`);
  };

  // Update URL search params for search and category change
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#FEFBF0] font-sans text-gray-800">
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
          <AppNavbar />
        </div>
        <div className="max-w-screen-xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-extrabold mb-14 tracking-tight text-gray-900">
            Products
          </h1>

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <select
              className="border border-gray-300 rounded px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              value={selectedCategory}
              onChange={onCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition flex-grow"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 italic text-lg mt-20">
              No products found for this category or search.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="
                    bg-white border border-gray-200 rounded-lg 
                    flex flex-col items-center
                    p-4
                    w-36 h-[17.5rem]
                    sm:w-48 sm:h-[17.5rem]
                    hover:shadow-lg transition-shadow duration-300
                  "
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 w-full h-28 object-fill rounded-md shadow-sm"
                  />
                  <div className="text-center font-semibold text-base mb-0.5 text-gray-900 line-clamp-1">
                    {product.name}
                  </div>
                  <div className="text-center text-gray-500 text-xs mb-2">
                    ₹{Number(product.price).toFixed(2)}
                  </div>
                  <div className="w-full flex items-center justify-center space-x-2 mb-2">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-700 text-sm">{getQuantity(product.id)}</span>
                    <button
                      onClick={() => incrementQuantity(product)}
                      className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-4 py-2 rounded-md w-full transition"
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
