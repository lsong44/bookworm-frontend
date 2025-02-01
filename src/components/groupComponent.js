import React, { useState, useEffect} from 'react';
import {getGroups, createGroup} from '../services/groupService';

const GroupComponent = () => {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async() => {
        try {
            const data = await getGroups();
            setGroups(data);
        } catch (error) {
            console.error('Failed to fetch groups:', error);
        }
    };

    const handleSaveGroup = async() => {
        try {
            await createGroup({name: group});
            setGroup('');
            fetchGroups();
        } catch (error) {
            console.error('Failed to save group:', error);
        }
    };

    return (
        <div>
            <h2>Groups</h2>
            <input 
                type="text" 
                value={group} 
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