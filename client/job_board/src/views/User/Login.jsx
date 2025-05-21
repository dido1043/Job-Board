import React, { use, useState, useEffect } from 'react';
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
        try {
            const response = await axios.get(`http://localhost:8080/user/find/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            const userId = response.data;
            localStorage.setItem('userId', userId);
            return userId;
        } catch (error) {
            setError({
                message: 'Error fetching user ID'
            });
        }
    }
    //Get user role
    const getUserRole = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/get-role/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            localStorage.setItem('userRole', response.data);
            console.log(response.data); // Log the user role
        } catch (err) {
            setError({
                message: 'Error fetching user role'
            });
        }
    }

    //Get usernamre
    const getUsername = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/get-username/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            localStorage.setItem('username', response.data);
        } catch (err) {
            setError({
                message: 'Error fetching username'
            });
        }
    }

    const handleSubmit = async (e) => {
        setError([]);
        e.preventDefault();
        const formErrors = validateForm();
        try {
            const response = await axios.post(`http://localhost:8080/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {
                const expirationTime = new Date().getTime() + 200 * 2000
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('tokenExpiration',  expirationTime);
                localStorage.setItem('userEmail', formData.email);

                const userId = await getUserId(formData.email);

                if (userId) {
                    console.log("userId before calling getUserRole:", userId);
                    await getUserRole(userId);
                    await getUsername(userId);
                    navigate(`/user/${localStorage.getItem('userId')}`);
                    window.location.reload();
                }
            } else {
                console.log("Login failed");

            }
        } catch (err) {
            setError({
                message: 'Invalid email or password'
            });
        }
    }
    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <InputField
                        label="Email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required={true}
                    />
                </div>
                <div className="mb-3">
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required={true}
                    />
                </div>

                <BaseButton text="Login" type="submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default Login;   