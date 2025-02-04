import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
    );
}

export default Logout;