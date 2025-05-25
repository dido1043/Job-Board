import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RecommendedJobs = () => {
    const [recJobs, setRecJobs] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [error, setError] = useState({
        message: ''
    });
    const nav = useNavigate();
    //Fetch recommended jobs for the user
    useEffect(() => {
        const getRecommendedJobs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/post/recommended/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setRecJobs(response.data);

            } catch (error) {
                setError({
                    message: 'Error fetching recommended jobs'
                });
            }
        }
        getRecommendedJobs();
    },[])
    const redirectToCurrentJob = (jobId) => {
        nav(`/job/${jobId}`);
    };
    return (
        <div className="container my-5">
            <h1 className="text-center">Recommended Job Posts for you!</h1>
            <div className="container my-5">
                <div className="row justify-content-center">
                    {recJobs.map((job) => (
                        <div className="row-md-6" key={job.id}>
                            <div className="card mb-3"
                                onClick={redirectToCurrentJob.bind(null, job.id)}
                                style={{ cursor: "pointer" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <p className="card-text text-muted">📍{job.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default RecommendedJobs;