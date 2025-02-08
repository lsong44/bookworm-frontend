import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { memberService } from '../services/memberService';
import { AuthContext } from '../context/authContext';

const MemberEditComponent = () => {
    const { memberName } = useParams();
    const { token } = useContext(AuthContext);
    const [member, setMember] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            memberService.getMember(token, memberName)
                .then((data) => {
                    setMember(data);
                    setNewEmail(data.email);
                })
                .catch((error) => console.error('Error fetching member details:', error));
        }
    }, [token, memberName]);

    const handleSaveChanges = () => {
        if (token && newEmail) {
            memberService.editMember(token, memberName, newEmail)
                .then((updatedMember) => {
                    setMember(updatedMember);
                    alert('Member updated successfully');
                })
                .catch((error) => console.error('Error updating member:', error));
        }
    };

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Member {memberName} </h2>
            <form>
                <div className="mb-3 form-inline">
                    <label className="form-label me-2">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email"
                    />
                </div>
                <button type="button" className="btn btn-primary me-2" onClick={handleSaveChanges}>Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/members")}>Back</button>
            </form>
        </div>
    );
};

export default MemberEditComponent;