const userServiceUrl = 'http://localhost:5001/users';
const productServiceUrl = 'http://localhost:5002/products';

function fetchUsers() {
    fetch(userServiceUrl)
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';
            data.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${user.id}, Name: ${user.name}`;
                usersList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

function fetchProducts() {
    fetch(productServiceUrl)
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('products-list');
            productsList.innerHTML = '';
            data.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${product.id}, Name: ${product.name}`;
                productsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}
