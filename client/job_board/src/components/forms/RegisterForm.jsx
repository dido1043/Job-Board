import React, { useState } from 'react';
import BaseButton from '../shared/BaseButton';
import InputField from '../shared/InputField';
import axios from 'axios'

const RegisterForm = () => {
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
    // TODO: Add same for success message
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
        setErrors([])
        e.preventDefault();
        const validationErrors = validateForm();


        if (Object.keys(validationErrors).length === 0) {
            new Promise((resolve, reject) => {
                axios.post(`http://localhost:8080/auth/register`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '/'
                    }
                })
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            }).then((response) => {
                setHandleSuccess({
                    status: response.status,
                    message: handleSuccess.message
                });
                setRegister(true);
                console.log(handleSuccess);
                console.log(response);
            }).catch((error) => {
                setHandleError({
                    status: error.response.status,
                    message: error.response.data.message
                });
                console.log(handleError);
                console.log(error);
            });
            setFormData({
                username: '',
                email: '',
                password: ''
            });


        } else {
            setErrors(validationErrors);
        }

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

export default RegisterForm;