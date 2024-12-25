import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleProductsClick = () => {
        navigate('/products');
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Product App</h1>
                <div className="hidden md:flex space-x-4">
                    <button onClick={handleHomeClick} className="text-white hover:underline">Home</button>
                    <button onClick={handleRegisterClick} className="text-white hover:underline">Register</button>
                    <button onClick={handleProductsClick} className="text-white hover:underline">Products</button>
                    <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
                </div>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden bg-blue-500 p-4">
                    <button onClick={handleHomeClick} className="block text-white hover:underline">Home</button>
                    <button onClick={handleRegisterClick} className="block text-white hover:underline">Register</button>
                    <button onClick={handleProductsClick} className="block text-white hover:underline">Products</button>
                    <button onClick={handleLogout} className="block text-white hover:underline">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
