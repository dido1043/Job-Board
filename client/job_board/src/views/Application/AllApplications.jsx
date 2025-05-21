import axios from 'axios';
import React from 'react';
import resumeDownloader from '../../components/utils/resumeDownloader';
import BaseButton from '../../components/shared/BaseButton';
import { useState, useEffect } from 'react';

const AllApplications = ({ jobId }) => {
    const [applications, setApplications] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [resumes, setResumes] = useState({});
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
                
                // Fetch usernames for all applications
                const usernamesMap = {};
                for (const application of response.data) {
                    try {
                        const userData = await axios.get(`http://localhost:8080/user/get-username/${application.jobSeekerId}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': '*/*'
                                }
                            }
                        );
                        usernamesMap[application.jobSeekerId] = userData.data;
                    } catch (error) {
                        console.log('Error fetching user:', error);
                        usernamesMap[application.jobSeekerId] = 'Unknown User';
                    }
                }
                setUsernames(usernamesMap);
                //Fetch resumes for all applications
                const resumesMap = {};
                for(const application of response.data){
                    try{
                        const resumeData = await axios.get(`http://localhost:8080/resume/get/${application.resumeId}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': '*/*'
                                }
                            }
                        );
                        resumesMap[application.resumeId] = resumeData.data; 
                    }catch(error){
                        console.log('Error fetching resumes:', error);
                    }
                }
                setResumes(resumesMap);
            } catch (error) {
                setErrors(error);
            }
        };

        getApplications();
    }, [jobId]);

    const downloadResume = async (resume) => {
        resumeDownloader(resume);
    };
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
            <h1 className="mb-4 text-center">All Applications</h1>
            {applications.length > 0 ? (
                <ul className="list-group w-100" style={{ maxWidth: '600px' }}>
                    {applications.map((application) => (
                        <li key={application.id} className="list-group-item mb-3 shadow-sm">
                            <p><strong>Applicant Name:</strong> {usernames[application.jobSeekerId]}</p>
                            <p><strong>Resume:</strong><BaseButton onClick={() => downloadResume(resumes[application.resumeId])} text="View CV" /></p>
                            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No applications found for this job.</p>
            )}
        </div>
    );
};

export default AllApplications;