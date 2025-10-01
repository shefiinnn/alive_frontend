import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; address: string; place: string; number: string; email?: string }) => void;
}

export function CheckoutModal({ isOpen, onClose, onSubmit }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const parsedNumber = parseInt(number, 10);
  if (isNaN(parsedNumber) || !Number.isInteger(parsedNumber)) {
    toast.error("Please enter a valid number");
    return;
  }

  onSubmit({ name, address, place, number, email });

 
  onClose();


  const WatsNum = "917510450023"; 
  const message = `New Order Submitted!!\nName: ${name}\nAddress: ${address}\nPlace: ${place}\nNumber: ${number}\nEmail: ${email || "NA"}`;
  const whatsappURL = `https://wa.me/${WatsNum}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-2 mb-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
