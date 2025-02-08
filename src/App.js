import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Groups from './components/groupComponent';
import GroupEditComponent from './components/groupEditComponent';
import GroupDetailsComponent from './components/groupDetailsComponent';
import MemberEditComponent from './components/memberEditComponent';
import MemberDetailsComponent from './components/memberDetailsComponent';
import Login from './components/loginComponent';
import Logout from './components/logoutComponent';
import { AuthContext } from './context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MemberComponent from './components/memberComponent';

const App = () => {

    const {isAuthenticated} = useContext(AuthContext);

    return (
        <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <div className="container-fluid">
                  <Link className="navbar-brand" to="/">BookWorm</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/groups">Groups</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/members">Members</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                      {isAuthenticated? (
                        <Logout />
                      ) : (
                        <Login />
                      )}
                    </div>
                  </div>
                </div>
              </nav>
              <div className="container mt-4">
               <Routes>
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/group/:groupName" element={<GroupDetailsComponent />} />
                    <Route path="/group/:groupName/edit" element={<GroupEditComponent />} />
                    <Route path="/members" element={<MemberComponent />} />
                    <Route path="/member/:memberName" element={<MemberDetailsComponent />} />
                    <Route path="/member/:memberName/edit" element={<MemberEditComponent />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<h1>Welcome to the BookWorm!</h1>} />
                    
                </Routes>
              </div>
            </div>
        </Router>
    );
    }

export default App;