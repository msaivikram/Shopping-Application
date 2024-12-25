import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(` http://localhost:8080/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setName(response.data.name);
                setPrice(response.data.price);
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const productData = { name, price };

        if (id) {
            await axios.put(`http://localhost:8080/api/products/update/${id}`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axios.post('http://localhost:8080/api/products', productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        navigate('/products');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    {id ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;