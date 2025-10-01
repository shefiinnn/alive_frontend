import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import toast from 'react-hot-toast';
interface HeroCarouselButtonProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function HeroCarouselButton({ isOpen, onOpenChange, children }: HeroCarouselButtonProps) {
    const [formData, setFormData] = useState({ name: '', email: '', number: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/enquiries/', {
                name: formData.name,
                email: formData.email,
                number: formData.number,
                message: formData.message,
            });
            toast.success('Inquiry submitted successfully!');
            setFormData({ name: '', email: '', number: '', message: '' });
            onOpenChange(false);
        } catch (error) {
            toast.error('Failed to submit inquiry. Please try again.');
            console.error('Inquiry submission error:', error);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <div> {children}  </div>
            </DialogTrigger>
            <DialogOverlay className="bg-black/10" />
            <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg z-50">
                <DialogHeader>
                    <DialogTitle>Plan Your Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="number">Phone Number</Label>
                        <Input id="number" name="number" type="tel" value={formData.number} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
