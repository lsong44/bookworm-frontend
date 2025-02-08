import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { groupService } from '../services/groupService';
import { AuthContext } from '../context/authContext';

const GroupEditComponent = () => {
    const { groupName } = useParams();
    const { announcement = null } = useParams();
    const {startOfTheDay = null } = useParams();
    const { maxMembers = null } = useParams();
    const { strikeLimit = null } = useParams();
    const { token } = useContext(AuthContext);
    const [group, setGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [newStartOfTheDay, setNewStartOfTheDay] = useState('');
    const [newMaxMembers, setNewMaxMembers] = useState('');
    const [newStrikeLimit, setNewStrikeLimit] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            groupService.getGroup(token, groupName)
                .then((data) => {
                    setGroup(data);
                    setNewGroupName(data.name);
                    setNewAnnouncement(data.announcement);
                    setNewStartOfTheDay(data.startOfTheDay);
                    setNewMaxMembers(data.maxMembers);
                    setNewStrikeLimit(data.strikeLimit);
                })
                .catch((error) => console.error('Error fetching group details:', error));
        }
    }, [token, groupName]);

    const handleSaveChanges = () => {
        if (token && newGroupName) {
            groupService.editGroup(token, newGroupName, announcement, startOfTheDay, maxMembers, strikeLimit)
                .then((updatedGroup) => {
                    setGroup(updatedGroup);
                    alert('Group updated successfully');
                })
                .catch((error) => console.error('Error updating group:', error));
        }
    };

    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Group {groupName}</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Group Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Enter new group name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Announcement</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        placeholder="Enter announcement"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start of the Day</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newStartOfTheDay}
                        onChange={(e) => setNewStartOfTheDay(e.target.value)}
                        placeholder="Enter start of the day"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Max Members</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newMaxMembers}
                        onChange={(e) => setNewMaxMembers(e.target.value)}
                        placeholder="Enter max members"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Strike Limit</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newStrikeLimit}
                        onChange={(e) => setNewStrikeLimit(e.target.value)}
                        placeholder="Enter strike limit"
                    />
                </div>
                <button type="button" className="btn btn-primary me-2" onClick={handleSaveChanges}>Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/groups")}>Back</button>
            </form>
        </div>
    );
};

export default GroupEditComponent;