import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import BaseButton from '../../components/shared/BaseButton';
import InputField from '../../components/shared/InputField';

const CreateJobPost = ({isEditable, jpData}) => {
    // Logic for creating a job post goes here
    const [jobId, setJobId] = useState(window.location.pathname.split('/').pop());
    const [jobPost, setJobPost] = useState({
        title: "",
        description: "",
        location: "",
        salary: 0,
        seniority: "",
        skills: [],
        recruiterId: localStorage.getItem('userId')
    });

    useEffect(() => {
        if (isEditable) {
            setJobPost({
                title: jpData.title,
                description: jpData.description,
                location: jpData.location,
                salary: jpData.salary,
                seniority: jpData.seniority,
                skills: jpData.skills
            });
        }
    }, [isEditable, jpData]);
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
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/post/create`, jobPost, {
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
    const editJobPost = async (e) => {
        e.preventDefault();
        if (!jobPost.title || !jobPost.description || !jobPost.location || jobPost.salary <= 0) {
            setError({ message: "Please fill all fields correctly." });
            console.log(error.message);
            return;
        }
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_KEY}/post/edit/${jpData.id}`, jobPost, {
            headers: {  
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
          });
          nav(`/jobs/all`);
        } catch (err) {
            setError({
                message: 'Error with updating job post'
            });
        }
    }
    return (
        <div className="container mt-5">
            {isEditable ?
                <h1 className="text-center mb-4">Edit Job Post</h1> :
                <div>
                    <h1 className="text-center mb-4">Create Job Post</h1>
                    <p className="text-center mb-4">Fill in the details below to create a new job post.</p>
                </div>
            }

            <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={isEditable? editJobPost : createJobPost}>
                <div className="mb-3">
                    <InputField label="Title" value={jobPost.title} type="text" name="title" onChange={handleInputChange} placeholder="Enter job title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea id="description" value={jobPost.description} name="description" onChange={handleInputChange} className="form-control" rows="4" required></textarea>
                </div>
                <div className="mb-3">
                    <InputField label="Location" value={jobPost.location} type="text" name="location" onChange={handleInputChange} placeholder="Enter job location" required />
                </div>
                <div className="mb-3">
                    <InputField label="Salary" value={jobPost.salary} type="number" name="salary" onChange={handleInputChange} placeholder="Enter salary" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="seniority" className="form-label">Seniority:</label>
                    <select id="seniority" value={jobPost.seniority} name="seniority" className="form-select" onChange={handleInputChange} required>
                        <option value="" disabled selected>Select seniority</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className="mb-3">
                    <InputField label="Skills" value={jobPost.skills} type="text" name="skills" onChange={handleInputChange} placeholder="Enter skills, separated by ','" required />
                </div>

               
               <BaseButton type="submit" text={isEditable ? "Edit job post" :"Create Job Post"}/> 
            </form>
            <br />
        </div>
    );
}

export default CreateJobPost;   