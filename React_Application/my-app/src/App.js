import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import Register from './components/Register';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-500'>

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;