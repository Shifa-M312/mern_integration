import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // calls Backend "Register" route
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.msg || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
                <input 
                    type="text" placeholder="Full Name" 
                    className="w-full p-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                />
                <input 
                    type="email" placeholder="Email" 
                    className="w-full p-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                />
                <input 
                    type="password" placeholder="Password" 
                    className="w-full p-2 mb-6 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Register
                </button>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default Register;
