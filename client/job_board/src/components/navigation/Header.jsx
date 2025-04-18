import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BaseButton from '../shared/BaseButton';

const Header = () => {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    //const [role, setRole] = useState(() => localStorage.getItem("role"));

    const LogoutFn = () => {
        localStorage.clear();
        setToken(null);
        //setRole(null);
        
        window.location.reload();
        Navigate('/');
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
                <div className="collapse navbar-collapse" id="navbarNav">
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


                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;