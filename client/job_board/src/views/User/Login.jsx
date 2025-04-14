import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        message: ''
    });
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };
    //Get user id
    const getUserId = async (email) => {
        // Implement logic to get user ID from the backend or context
        try {
            const response = await axios.get(`http://localhost:8080/user/find/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '/'
                }
            });

            localStorage.setItem('userId', response.data.id); // Store user ID in local storage

        } catch (error) {
            setError({
                message: 'Error fetching user ID'
            }); 
        }
    }
    //Get user role
    // const getUserRole = async () => {

    // }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;   