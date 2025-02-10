import React, { useContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {logService} from '../services/logService';
import { AuthContext } from '../context/authContext';

const LogComponent = (props) => {
    const memberName = props.memberName;
    const [logs, setLogs] = useState([]);
    const { token } = useContext(AuthContext);
    const [ title, setTitle ] = useState('');
    const [ comment, setComment ] = useState('');

    useEffect(() => {
        if (token) {
            logService.getLogs(token, memberName)
            .then((data) => setLogs(data))
            .catch((error) => console.error('Error fetching groups:', error));
        }
    }, [token]);

    const handleAddLog = (title, comment = null) => {
        if (token) {
            logService.addLog(token, memberName, title, comment)
            .then((newlog) => {
                setLogs([...logs, newlog]);
            })
            .catch((error) => console.error('Error creating group:', error));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Logs</h2>
            <form className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter new log title'
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Enter new log comment'
                    />
                    <button type="button" className="btn btn-primary" onClick={() => handleAddLog(title, comment)}>Add Log</button>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.timestamp}>
                            <td>{log.bookTitle}</td>
                            <td>{log.comment}</td>
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LogComponent;
