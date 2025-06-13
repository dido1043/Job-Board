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
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/post/all`, {
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
    const filterJobsBySeniority = async (seniority) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_KEY}/post/filter/${seniority}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setJobs(response.data);
        } catch (error) {
            setError({
                message: 'Error filtering jobs'
            });
        }
    }
    const resetFilter = async () => {
        window.location.reload();
    }
    const redirectToCurrentJob = (jobId) => {
        nav(`/job/${jobId}`);
    };
    const redirectToLoginPage = () => {
        nav('/login');
    }

    return (
        <div className="container my-5">
            <h1 className="text-center display-4"> 💸All Job Posts💸 </h1>
            <p className="text-center lead">Find your dream job here and take the next step in your career!</p>
           
            <div className="text-center my-4">
                <h4 className="mb-3">Filter by Seniority</h4>
                <div className="btn-group" role="group" aria-label="Seniority Filter">
                    <button type="button" className="btn btn-primary" onClick={() => filterJobsBySeniority("Junior")}>Junior</button>
                    <button type="button" className="btn btn-secondary" onClick={() => filterJobsBySeniority("Mid")}>Mid</button>
                    <button type="button" className="btn btn-success" onClick={() => filterJobsBySeniority("Senior")}>Senior</button>
                </div>
                <br />
                <button type="button" className="btn btn-danger mt-3" onClick={() => resetFilter()}>Reset Filters</button>
            </div>

            <div className="container my-5">
                <div className="row justify-content-center">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div className="col-md-6 col-lg-4" key={job.id}>
                                <div className="card mb-4 shadow-sm"
                                    onClick={localStorage.getItem("token") != null ? redirectToCurrentJob.bind(null, job.id) : redirectToLoginPage}
                                    style={{ cursor: "pointer", borderRadius: "10px" }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{job.title}</h5>
                                        <p className="card-text text-muted">📍 {job.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <p className="text-muted">No job posts available. Please try again later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllJobPosts;