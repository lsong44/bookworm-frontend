import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { memberService } from '../services/memberService';
import { AuthContext } from '../context/authContext';

const MemberComponent = () => {
    const [members, setMembers] = useState([]);
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            memberService.getMembers(token)
            .then((data) => setMembers(data))
            .catch((error) => console.error('Error fetching members:', error));
        }
    }, [token]);

    const handleSaveMember = () => {
        if (token && memberName && memberEmail) {
            memberService.createMember(token, memberName, memberEmail)
            .then((newMember) => {
                setMembers([...members, newMember]);
                setMemberName(newMember.name);
                setMemberEmail(newMember.email);
            })
            .catch((error) => console.error('Error creating member:', error));
        }
    };

    const handleEditMember = (memberName) => {
        if (token && memberName) {
            navigate(`/member/${memberName}/edit`);
        }
    }

    const handleDeleteMember = (memberName) => {
        if (token && memberName) {
            memberService.deleteMember(token, memberName)
            .then(() => {
                setMembers(members.filter(m => m.name !== memberName));
            })
            .catch((error) => console.error('Error deleting member:', error));
        }
    }

    return (
        <div className="container mt-4">
            <h2>Members</h2>
            <form className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        placeholder='Enter new member name'
                    />
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder='Enter email of the member to be added'
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSaveMember}>Create Member</button>
            </form>
            
            <ul className="list-group">
                {members.map((m, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/member/${m.name}`}>{m.name}: {m.email}</Link>
                        <div>
                            <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditMember(m.name)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMember(m.name)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberComponent;