import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import BaseButton from '../../components/shared/BaseButton';
import InputField from '../../components/shared/InputField';

const CreateJobPost = () => {
    // Logic for creating a job post goes here
    const [jobPost, setJobPost] = useState({
        title: "",
        description: "",
        location: "",
        salary: 0,
        seniority: "",
        skills: [],
        recruiterId: localStorage.getItem('userId')
    });

    const [error, setError] = useState({
        message: ''
    });
    const nav = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobPost((prevState) => ({
            ...prevState,
            [name]: name === "skills" ? value.split(",") : name === "salary" ? parseFloat(value) || 0 : value
        }));
    };
    const createJobPost = async (e) => {
        e.preventDefault();
        if (!jobPost.title || !jobPost.description || !jobPost.location || jobPost.salary <= 0) {

            setError({ message: "Please fill all fields correctly." });
            console.log(error.message);
            
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/post/create`, jobPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            });
            console.log(response.data);
            if (response.status === 201) {
                console.log("Job post created successfully!");
                nav('/jobs/all');
            }
        } catch (err) {
            setError({
                message: 'Error with creating job post'
            });
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create Job Post</h1>
            <p className="text-center mb-4">Fill in the details below to create a new job post.</p>

            <form className="mx-auto" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <InputField label="Title" type="text" name="title" onChange={handleInputChange} placeholder="Enter job title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea id="description" name="description" onChange={handleInputChange} className="form-control" rows="4" required></textarea>
                </div>
                <div className="mb-3">
                    <InputField label="Location" type="text" name="location" onChange={handleInputChange} placeholder="Enter job location" required />
                </div>
                <div className="mb-3">
                    <InputField label="Salary" type="number" name="salary" onChange={handleInputChange} placeholder="Enter salary" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="seniority" className="form-label">Seniority:</label>
                    <select id="seniority" name="seniority" className="form-select" onChange={handleInputChange} required>
                        <option value="" disabled selected>Select seniority</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className="mb-3">
                    <InputField label="Skills" type="text" name="skills" onChange={handleInputChange} placeholder="Enter skills, separated by ','" required />
                </div>

                <BaseButton type="submit" text="Create Job Post" onClick={createJobPost}/>
            </form>
            <br />
        </div>
    );
}

export default CreateJobPost;   