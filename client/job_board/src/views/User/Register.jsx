import React, { useState } from 'react';
import BaseButton from '../../components/shared/BaseButton';
import InputField from '../../components/shared/InputField';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const [handleError, setHandleError] = useState({
        status: '',
        message: ''
    });
    const [register, setRegister] = useState(false);

    const [handleSuccess, setHandleSuccess] = useState({
        status: 'Success',
        message: 'Successful register!'
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };


    const handleSubmit = (e) => {
        setErrors({});
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        axios.post(`${process.env.REACT_APP_API_KEY}/auth/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then((response) => {
            console.log(response.data);
            setRegister(true)
            setHandleSuccess({
                status: 'Success',
                message: 'Successful register!'
            })
            navigate('/login')
        }).catch((error) => {
            console.log(error.response.data.message);
            setHandleError({
                status: 'Error',
                message: error.response.data.message
            })
        });
    }
    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <InputField
                        label="Username"
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username" />
                </div>
                <div className="mb-3">
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password" />
                </div>
                <BaseButton text="Register" type="submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}
export default Register;   