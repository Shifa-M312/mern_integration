import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', formData);
            
            localStorage.setItem('token', res.data.token); 
            alert("Login Successful!");
            navigate('/userdata');
        } catch (err) {
            alert(err.response?.data?.msg || "Invalid Email or Password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" placeholder="Email Address" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" placeholder="Password" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                    <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Don't have an account? <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate('/register')}>Register here</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
