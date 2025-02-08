import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { memberService } from '../services/memberService';
import { membershipService } from '../services/membershipService';
import { AuthContext } from '../context/authContext';

const MemberDetailsComponent = () => {
    const { memberName } = useParams();
    const { token } = useContext(AuthContext);
    const [member, setMember] = useState(null);
    const [groups, setGroups] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            memberService.getMember(token, memberName)
                .then((data) => {
                    setMember(data);
                })
                .catch((error) => console.error('Error fetching member details:', error));

            membershipService.getMembershipByMember(token, memberName)
                .then((data) => {
                    setMemberships(data);
                    if (data.length > 0) {
                        const groups = data.map((membership) => ({
                            group: membership.group,
                            groupName: membership.group.name,
                            groupRole: membership.role.name,
                            groupRoleSince: membership.role.createdAt,
                        }));
                        setGroups(groups);  
                    }
                })
                .catch((error) => console.error('Error fetching groups the memeber belongs to:', error));
        }
    }, [token, memberName]);

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-4">
                <h2 className="mb-4">Member {memberName}</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card" style={{ backgroundColor: 'lightgrey' }}>
                            <div className="card-body">
                                <h5 className="card-title">Member Details</h5>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{member.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{member.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <h5 className="card-title">Groups</h5>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Group Name</th>
                                    <th>Role</th>
                                    <th>Since</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/group/${group.groupName}`}>{group.groupName}</Link></td>
                                        <td>{group.groupRole}</td>
                                        <td>{group.groupRoleSince}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => navigate(`/member/${memberName}/edit`)}>Edit</button>
                    <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsComponent;