import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://alive-backend.onrender.com/api/token/', { username, password });
            const { access } = response.data;
            Cookies.set('access_token', access, { secure: true });
            Cookies.set('isLoggedIn', 'true', { expires: 1 });
            navigate('/admin/dashboard',{replace:true});
        } catch (error) {
            console.error(error);
            toast.error("Login Failed.Please check your Username and Password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white w-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome 
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black text-black"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
