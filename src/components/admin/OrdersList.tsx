import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';


interface Order {
    id: number;
    customer_name: string;
    product: { name: string };
    quantity: number;
    status: 'PENDING' | 'COMPLETED' | 'DECLINED';
    date: string;
    number: string;
    subtotal: string | number;
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://alive-backend.onrender.com/api/orders/');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to Fetch Orders");
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, newStatus: Order['status']) => {
        try {
            await axios.patch(`https://alive-backend.onrender.com/api/orders/${id}/`, { status: newStatus });
            toast.success('Order status updated');
            fetchOrders();
        } catch (error) {
            toast('Failed to update status.');
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer_name}</TableCell>
                            <TableCell>{order.product.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>₹{order.subtotal ? Number(order.subtotal).toFixed(2) : '0.00'}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>{order.number}</TableCell>
                            <TableCell className={
                                order.status === "PENDING"
                                    ? "text-yellow-500"
                                    : order.status === "COMPLETED"
                                        ? "text-green-500"
                                        : order.status === "DECLINED"
                                            ? "text-red-500"
                                            : ""
                            }>{order.status}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Change Status</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className='text-yellow-500' onClick={() => updateStatus(order.id, 'PENDING')}>Pending</DropdownMenuItem>
                                        <DropdownMenuItem className='text-green-500' onClick={() => updateStatus(order.id, 'COMPLETED')}>Completed</DropdownMenuItem>
                                        <DropdownMenuItem className='text-red-500' onClick={() => updateStatus(order.id, 'DECLINED')}>Declined</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersPage;
