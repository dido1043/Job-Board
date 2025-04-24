import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseButton from '../shared/BaseButton';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/headerStyle.css';
const Header = () => {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    //const [role, setRole] = useState(() => localStorage.getItem("role"));

    const redirect = useNavigate();
    const LogoutFn = () => {
        localStorage.clear();
        setToken(null);
        redirect('/');
        window.location.reload();
        console.log("Logout function called");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Job Board</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="nav-div collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/jobs/all">All Jobs</Link>
                        </li>
                        {token != null ?
                            <>
                                <li className="nav-item">
                                    <BaseButton text="Logout" type="button" onClick={() => LogoutFn()} />
                                </li>
                            </> :
                            <>
                                <li>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>}

                            {token != null ?
                                <li className="username nav-item ms-auto">
                                    <Link className="nav-link" to={`/user/${localStorage.getItem('userId')}`}>{localStorage.getItem('username')}</Link>
                                </li>:<></>
                            }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;