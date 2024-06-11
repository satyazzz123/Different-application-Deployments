import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const apiUrl = process.env.REACT_APP_PRODUCTS_API_URL;

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [apiUrl]);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
