import { useState } from 'react'; 
import { useCart } from '../Orders/CartContext';
import { AppNavbar } from '../Navbar';
import { Footer } from '../Footer';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal'; 
import toast from 'react-hot-toast';
import axios from 'axios';

export function CartPage() {
  const { cartItems, update, remove } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const handleFormSubmit = async (data: { name: string; address: string; place: string; number: string; email?: string}) => {
    try {
      const orderPromises = cartItems.map(item => {
        const payload = {
          customer_name: data.name,
          address: data.address,
          place: data.place,
          number: data.number,
          email: data.email || null,
          product: item.id, 
          quantity: item.quantity, 
        };

        console.log('Submitting order for item:', payload); 

        return axios.post('https://alive-backend.onrender.com/api/orders/', payload);
      });

      const responses = await Promise.all(orderPromises);

      console.log('All orders placed:', responses.map(res => res.data));
      toast.success('All orders placed successfully!');
      cartItems.forEach(item => remove(item.id));
      setIsModalOpen(false);
    } catch (error : any) {
      console.error('Error placing orders:', error);
      if (error.response) {
        console.error('Backend errors:', error.response.data);
      }
      toast.error('Failed to place orders. Check console for details.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-yellow-100">
        <AppNavbar />
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <Button asChild className='bg-white hover:bg-yellow-300 text-black'>
            <a href="/products">Browse Products</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-yellow-100">
      <AppNavbar />
      <div className="flex-grow flex flex-col items-center py-8">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-2xl mb-3 px-3">Check out</h1>
          <p className="font-semibold mb-6 px-3">Items in cart: {cartItems.length}</p>
          
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-2xl p-3 shadow mb-3"
                style={{ minHeight: 90 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4 flex-grow">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => update(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => update(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="ml-3"
                  aria-label="Remove"
                  style={{ padding: 4 }}
                >
                  <Trash color="red" size={24} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-right font-semibold mt-4 px-3">Subtotal: ₹{subtotal.toFixed(2)}</p>
        </div>

        <div className="w-full max-w-md flex justify-between items-center mt-7 gap-6 px-2">
          <button
            className="flex-1 border border-gray-300 rounded-full px-6 py-2 font-medium bg-white hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="flex-1 rounded-full px-6 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)} 
          >
            Next
          </button>
        </div>
      </div>
      <Footer />

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
