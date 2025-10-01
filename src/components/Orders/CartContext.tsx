import { createContext, useContext, useState, useEffect } from 'react'; 
import type { ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartCtx = {
  cartItems: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  update: (id: number, qty: number) => void;
  remove: (id: number) => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const add = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === item.id);
      return found
        ? prev.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
          )
        : [...prev, { ...item, quantity: qty }];
    });
  };

  const update = (id: number, qty: number) => {
    setCartItems(prev =>
      qty < 1 ? prev.filter(i => i.id !== id) : prev.map(i => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const remove = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, add, update, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
