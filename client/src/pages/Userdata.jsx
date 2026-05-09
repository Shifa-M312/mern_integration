import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userdata = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '' });

    
    const fetchCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/customers/all');
            setCustomers(res.data);
        } catch (err) {
            console.error("Error fetching customers", err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/customers/add', formData);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '' }); // Clear form
            fetchCustomers(); 
            alert("Customer Added!");
        } catch (err) {
            alert("Error adding customer");
        }
    };

    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await axios.delete(`http://localhost:5000/api/customers/delete/${id}`);
            fetchCustomers();
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-700 mb-8">CRM Dashboard</h1>

                
                <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Customer</h2>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="border p-2 rounded" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                        <input className="border p-2 rounded" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                        <input className="border p-2 rounded" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                        <input className="border p-2 rounded" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                        <button className="bg-indigo-600 text-white p-2 rounded font-bold hover:bg-indigo-700 md:col-span-2">Create Customer</button>
                    </form>
                </div>

                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 border-b">Name</th>
                                <th className="p-4 border-b">Email</th>
                                <th className="p-4 border-b">Phone</th>
                                <th className="p-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c) => (
                                <tr key={c._id} className="hover:bg-gray-50 border-b">
                                    <td className="p-4">{c.firstName} {c.lastName}</td>
                                    <td className="p-4">{c.email}</td>
                                    <td className="p-4">{c.phone}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleDelete(c._id)} className="text-red-600 font-medium hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Userdata;
