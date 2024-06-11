import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_USERS_API_URL;

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [apiUrl]);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
