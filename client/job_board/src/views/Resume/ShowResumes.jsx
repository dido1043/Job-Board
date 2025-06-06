import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import BaseButton from '../../components/shared/BaseButton';
import resumeDownloader from '../../components/utils/resumeDownloader';
const ShowResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [userId, setUserId] = useState(Number(localStorage.getItem('userId')));
    const [fileData, setFileData] = useState(null);
    useEffect(() => {
        const getResumes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/resume/get-by-userId/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setResumes(response.data);


            } catch (error) {
                console.log('Error fetching resumes:', error);
            }
        }

        getResumes();
    }, [userId]);

    const downloadResume = (resume) => {
        resumeDownloader(resume);
    };

    const deleteResume = async (resumeId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_KEY}/resume/delete/${resumeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            window.location.reload();
        } catch (error) {
            console.log('Error deleting resume:', error);
        }
    }

   
    return (
        <div className='container mt-5 mb-5'>
            <h2 className='text-center mt-4 mb-5'>My Resumes</h2>
            <div className="col-md-12 w-100">
                {resumes.map((resume) => (
                    <div className="col-md-4 mb-4 w-100" key={resume.id} style={{ gap: '1px' }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Document ID:{resume.id}</h5>
                                <div className="buttons d-flex justify-content-between" style={{ gap: '2px' }}>
                                    <BaseButton onClick={() => downloadResume(resume)} text="View file" />
                                    <button className='btn btn-danger' onClick={() => deleteResume(resume.id)} >Delete file</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowResumes;