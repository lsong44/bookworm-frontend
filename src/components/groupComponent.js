import React, { useContext, useState, useEffect} from 'react';
import {groupService} from '../services/groupService';
import { AuthContext } from '../context/authContext';

const GroupComponent = () => {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroup] = useState('');
    const { token } = useContext(AuthContext);

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

    return (
        <div>
            <h2>Groups</h2>
            <input 
                type="text" 
                value={groupName} 
                onChange={(e) => setGroup(e.target.value)} 
                placeholder="Enter group name" 
            />
            <button onClick={handleSaveGroup}>Save Group</button>
            <ul>
                {groups.map((g, index) => (
                    <li key={index}>{g.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupComponent;