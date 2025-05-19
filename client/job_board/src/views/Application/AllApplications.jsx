import axios from 'axios';
import React, { use } from 'react';
import { useState, useEffect } from 'react';
const AllApplications = ({ jobId }) => {
    const [applications, setApplications] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/application/job/${jobId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setApplications(response.data);
                console.log(response.data);
            } catch (error) {
                setErrors(error);
            }

        }

        getApplications();

    }, [jobId]);

    
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
            <h1 className="mb-4 text-center">All Applications</h1>
            {applications.length > 0 ? (
                <ul className="list-group w-100" style={{ maxWidth: '600px' }}>
                    {applications.map((application) => (
                        <li key={application.id} className="list-group-item mb-3 shadow-sm">
                            <p><strong>Applicant Name:</strong> {application.jobSeekerId}</p>
                            <p><strong>Resume:</strong> {application.resumeId}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No applications found for this job.</p>
            )}
        </div>
    );

}
export default AllApplications;