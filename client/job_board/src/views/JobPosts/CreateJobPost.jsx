import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import BaseButton from '../../components/shared/BaseButton';
import InputField from '../../components/shared/InputField';

const CreateJobPost = () => {   
    // Logic for creating a job post goes here
    // This might include form handling, API calls, etc.    
    // For example, you might want to use useState to manage form inputs
    // and useEffect to fetch any necessary data when the component mounts.
    // Example of using useState for form inputs
        
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create Job Post</h1>
            <p className="text-center mb-4">Fill in the details below to create a new job post.</p>
            
            <form className="mx-auto" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <InputField label="Title" type="text" name="title" placeholder="Enter job title" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea id="description" name="description" className="form-control" rows="4" required></textarea>
                </div>
                <div className="mb-3">
                    <InputField label="Location" type="text" name="location" placeholder="Enter job location" required/>
                </div>
                <div className="mb-3">
                    <InputField label="Salary" type="number" name="salary" placeholder="Enter salary" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="seniority" className="form-label">Seniority:</label>
                    <select id="seniority" name="seniority" className="form-select" required>
                        <option value="" disabled selected>Select seniority</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className="mb-3">
                    <InputField label="Skills" type="text" name="skills" placeholder="Enter skills" required/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Job Post</button>
                
            </form>
            <br />
        </div>
    );
}

export default CreateJobPost;   