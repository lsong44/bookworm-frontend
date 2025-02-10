import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { groupService } from '../services/groupService';
import { membershipService } from '../services/membershipService';
import { AuthContext } from '../context/authContext';

const GroupDetailsComponent = () => {
    const { groupName } = useParams();
    const { token } = useContext(AuthContext);
    const [group, setGroup] = useState(null);
    const [newGroupName, setGroupName] = useState('');
    const [newAnnouncement, setAnnouncement] = useState('');
    const [newStartOfTheDay, setStartOfTheDay] = useState('');
    const [newMaxMembers, setMaxMembers] = useState('');
    const [newStrikeLimit, setStrikeLimit] = useState('');
    const [memberships, setMemberships] = useState([]);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState('');
    const [memberRole, setMemberRole] = useState('');

    useEffect(() => {
        if (token) {
            groupService.getGroup(token, groupName)
                .then((data) => {
                    setGroup(data);
                    setGroupName(data.name);
                    setAnnouncement(data.announcement);
                    setStartOfTheDay(data.startOfTheDay);
                    setMaxMembers(data.maxMembers);
                    setStrikeLimit(data.strikeLimit);
                })
                .catch((error) => console.error('Error fetching group details:', error));

            membershipService.getMembershipByGroup(token, groupName)
                .then((data) => {
                    setMemberships(data);
                    if (data.length > 0) {
                        const members = data.map((membership) => ({
                            member: membership.member,
                            memberName: membership.member.name,
                            memberEmail: membership.member.email,
                            memberRole: membership.role.name,
                            memberRoleSince: membership.role.createdAt,
                        }));
                        setMembers(members);
                        
                    }
                })
                .catch((error) => console.error('Error fetching group members:', error));
        }
    }, [token, groupName]);


    if (!group) {
        return <div>Loading...</div>;
    }

    const handleAddMember = (memberName, memberRole) => {
        if (token && memberName && memberRole) {
            membershipService.addMembership(token, memberName, groupName, memberRole)
                .then((data) => {
                    const newMember = {
                        member: data.member,
                        memberName: data.member.name,
                        memberEmail: data.member.email,
                        memberRole: data.role.name,
                        memberRoleSince: data.role.createdAt,
                    };
                    setMembers([...members, newMember]);
                })
                .catch((error) => console.error('Error creating member:', error));
        }
    }


    const handleDeleteMember = (memberName, role) => {
        if (token) {
            membershipService.deleteMembership(token, groupName, memberName, role)
                .then(() => {
                    setMembers(members.filter((m) => (m.memberName !== memberName || m.memberRole !== role)));
                })
                .catch((error) => console.error('Error deleting member:', error));
        }
    }

    const handlePromoteWaitlister = () => {
        if (token) {
            membershipService.promoteWaitlister(token, groupName)
                .then(() => {
                    membershipService.getMembershipByGroup(token, groupName)
                        .then((data) => {
                            const members = data.map((membership) => ({
                                member: membership.member,
                                memberName: membership.member.name,
                                memberEmail: membership.member.email,
                                memberRole: membership.role.name,
                                memberRoleSince: membership.role.createdAt,
                            }));
                            setMembers(members);
                        })
                        .catch((error) => console.error('Error fetching group members:', error));
                    
                })
                .catch((error) => console.error('Error promoting waitlister:', error));
        }
    }

    const handleCleanup = () => {
        if (token) {
            membershipService.cleanUpMembership(token, groupName)
                .then(() => {
                    membershipService.getMembershipByGroup(token, groupName)
                        .then((data) => {
                            setMemberships(data);
                            if (data.length > 0) {
                                const members = data.map((membership) => ({
                                    member: membership.member,
                                    memberName: membership.member.name,
                                    memberEmail: membership.member.email,
                                    memberRole: membership.role.name,
                                    memberRoleSince: membership.role.createdAt,
                                }));
                                setMembers(members);
                                
                            }
                        })
                        .catch((error) => console.error('Error fetching group members:', error));
                    
                })
                .catch((error) => console.error('Error cleaning up group:', error));
        }
    }

    return (
        <div>
            <div className="container mt-4">
                <h2 className="mb-4">Group {groupName}</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card" style={{ backgroundColor: 'lightgrey' }}>
                            <div className="card-body">
                                <h5 className="card-title">Group Details</h5>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Announcement</th>
                                            <td>{newAnnouncement}</td>
                                        </tr>
                                        <tr>
                                            <th>Start of the day</th>
                                            <td>{newStartOfTheDay}</td>
                                        </tr>
                                        <tr>
                                            <th>Max Members</th>
                                            <td>{newMaxMembers}</td>
                                        </tr>
                                        <tr>
                                            <th>Strike Limit</th>
                                            <td>{newStrikeLimit}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <h5 className="card-title">Members</h5>
                        <form className="mb-4">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={memberName}
                                    onChange={(e) => setMemberName(e.target.value)}
                                    className="form-control"                                   
                                    placeholder='Enter new member name'
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={memberRole}
                                    onChange={(e) => setMemberRole(e.target.value)}
                                    className="form-control"
                                    placeholder='Enter role of the member to be added'
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => handleAddMember(memberName, memberRole)}>Add Member to Group</button>
                        </form>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Role Since</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((m, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/member/${m.memberName}`}>{m.memberName}</Link></td>
                                        <td>{m.memberRole}</td>
                                        <td>{m.memberRoleSince}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" 
                                                onClick={() => handleDeleteMember(m.memberName, m.memberRole)}>
                                                    Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div>
                    
                    <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => navigate(`/group/${groupName}/edit`)}>Edit</button>
                    <button type="button" className="btn btn-success mt-3 me-2" onClick={() => handlePromoteWaitlister()}>Promote waitlisters</button>
                    <button type="button" className="btn btn-danger mt-3 me-2" onClick={() => handleCleanup()}>Clean up group</button>
                    <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default GroupDetailsComponent;