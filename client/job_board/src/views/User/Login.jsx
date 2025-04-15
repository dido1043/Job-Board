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
                    'Accept': '*/*'
                }
            });

            localStorage.setItem('userId', response.data); // Store user ID in local storage

        } catch (error) {
            setError({
                message: 'Error fetching user ID'
            });
        }
    }
    //Get user role
    // const getUserRole = async () => {

    // }

    const handleSubmit = async (e) => {
        setError([]);
        e.preventDefault();
        const formErrors = validateForm();
        try{
            const response = await axios.post(`http://localhost:8080/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {

                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('tokenExpiration', response.data.expiresIn);
                localStorage.setItem('userEmail', formData.email); 
                await getUserId(formData.email); 
                navigate('/');
            }else{
                console.log("Login failed");
                
            }
        }catch(err){
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

                <BaseButton text="Login" type="submit" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default Login;   