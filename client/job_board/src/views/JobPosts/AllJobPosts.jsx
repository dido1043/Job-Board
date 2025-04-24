import { useState, useEffect } from "react";
import axios from "axios";
const AllJobPosts = () => {
    const [jobs, setJobs] = useState([]);

    const [error, setError] = useState({
        message: ''
    });

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

    return (
        <div class="container my-5">
            <h1 class="text-center">All Job Posts</h1>
            <p class="text-center">Find your dream job here!</p>
            <div class="container my-5">
                <div class="row justify-content-center">
                    {jobs.map((job) => (
                        <div class="row-md-6">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">{job.title}</h5>
                                    <p class="card-text text-muted">📍{job.location}</p>
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