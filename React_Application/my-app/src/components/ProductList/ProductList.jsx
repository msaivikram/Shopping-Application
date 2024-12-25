import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/products/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <button
                onClick={() => navigate('/add-product')}
                className="mb-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            >
                Add Product
            </button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 p-2">{product.id}</td>
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{product.price}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => navigate(`/edit-product/${product.id}`)}
                                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;