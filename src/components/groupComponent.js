import React, { useContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {groupService} from '../services/groupService';
import { AuthContext } from '../context/authContext';

const GroupComponent = () => {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroup] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            groupService.getGroups(token)
            .then((data) => setGroups(data))
            .catch((error) => console.error('Error fetching groups:', error));
        }
    }, [token]);


    const handleSaveGroup = () => {
        if (token && groupName) {
            groupService.createGroup(token, groupName)
            .then((newGroup) => {
                setGroups([...groups, newGroup]);
                setGroup('');
            })
            .catch((error) => console.error('Error creating group:', error));
        }
    };

    const handleEditGroup = (groupName) => {
        if (token && groupName) {
            navigate(`/group/${groupName}/edit`);
        }
    }

    const handleDeleteGroup = (groupName) => {
        if (token && groupName) {
            groupService.deleteGroup(token, groupName)
            .then(() => {
                setGroups(groups.filter(g => g.name !== groupName));
            })
            .catch((error) => console.error('Error deleting group:', error));
        }
    }

    return (
        <div className="container mt-4">
            <h2>Groups</h2>
            <form className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={groupName}
                        onChange={(e) => setGroup(e.target.value)}
                        placeholder='Enter new group name'
                    />
                    <button type="button" className="btn btn-primary" onClick={handleSaveGroup}>Create Group</button>
                </div>
            </form>
            
            <ul className="list-group">
                {groups.map((g, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/group/${g.name}`}>{g.name}</Link>
                        <div>
                            <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditGroup(g.name)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteGroup(g.name)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupComponent;