import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
const AllJobPosts = () => {
    const [jobs, setJobs] = useState([]);

    const [error, setError] = useState({
        message: ''
    });

    const nav = useNavigate();
    useEffect(() => {

        const showJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/post/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                })

                setJobs(response.data)
            } catch (err) {
                setError({
                    message: 'Error fetching jobs'
                });
            }

        }
        showJobs()
    }, [])

    const redirectToCurrentJob = (jobId) => {
        nav(`/job/${jobId}`);
    };


    return (
        <div className="container my-5">
            <h1 className="text-center">All Job Posts</h1>
            <p className="text-center">Find your dream job here!</p>
            <div className="container my-5">
                <div className="row justify-content-center">
                    {jobs.map((job) => (
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

export default AllJobPosts;