import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import BaseButton from '../../components/shared/BaseButton';
const ShowResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [userId, setUserId] = useState(Number(localStorage.getItem('userId')));
    const [fileData, setFileData] = useState(null);
    useEffect(() => {
        const getResumes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/resume/get-by-userId/${userId}`, {
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
        if (!resume.filePath) return;

        try {
            const base64 = resume.filePath.split(',')[1];
            const binaryString = window.atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([bytes], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = resume.title || 'resume.pdf';
            link.click();

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.log("Failed to download PDF:", error);
        }
    };

    const deleteResume = async (resumeId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/resume/delete/${resumeId}`, {
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
                    <div className="col-md-4 mb-4 w-100" key={resume.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Document ID:{resume.id}</h5>
                                <div className="buttons d-flex justify-content-between">
                                    <BaseButton onClick={() => downloadResume(resume)} text="View file" />
                                    <button className='btn btn-danger me-2' onClick={() => deleteResume(resume.id)} >Delete file</button>
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