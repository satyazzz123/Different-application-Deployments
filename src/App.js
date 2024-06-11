import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './Users';
import Products from './Products';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
