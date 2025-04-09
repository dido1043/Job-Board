import { useState, useEffect } from "react";
import axios from "axios";
const AllJobPosts = () => {
    const [jobs, setJobs] = useState([]);
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
                console.error("Error fetching jobs", err);
            }

        }
        showJobs()
    }, [])

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {Array.isArray(jobs) && jobs.map((job, index) => (
                    <div className="col">
                        <div className="card shadow-sm">
                            <h5>{job.title}</h5>
                            <div className="card-body">
                                <p className="card-text">{job.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllJobPosts;