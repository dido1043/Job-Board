import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import PostResume from '../Resume/PostResume';
import BaseButton from '../../components/shared/BaseButton';

const CreateApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState({ message: '' });
  const [application, setApplication] = useState({
    jobSeekerId: Number(localStorage.getItem('userId')),
    jobPostId: Number(jobId),
    coverLetter: '',
    resumeId: 0,
  });
 
  const [isResumeUploading, setIsResumeUploading] = useState(false);

  const handleCoverLetterChange = (e) => {
    setApplication((prev) => ({ ...prev, coverLetter: e.target.value }));
  };

  const handleResumePosted = (resumeId) => {
    setApplication((prev) => ({ ...prev, resumeId }));
    setIsResumeUploading(false);
  };

  const handleResumeUploadStart = () => {
    setIsResumeUploading(true);
  };

  const handleSubmit = async () => {
    if (!application.resumeId) {
      setError({ message: 'Please upload a resume before submitting.' });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/application/add`, application, {
        headers: {
          'Content-Type': 'application/json',
            'Accept': '*/*',
        },
      });
      console.log('Application submitted:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Failed to submit application:', err);
      setError({ message: 'Failed to submit application. Please try again.' });
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <h1 className="mb-4 text-center">Create Application</h1>

      <div className="mb-3 w-100">
        <label htmlFor="coverLetter" className="form-label">Cover Letter:</label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          className="form-control"
          rows="4"
          value={application.coverLetter}
          onChange={handleCoverLetterChange}
          required
        />
      </div>

      {/* Upload Resume and receive resumeId */}
      <PostResume onResumePosted={handleResumePosted} onUploadStart={handleResumeUploadStart} />

      {error.message && (
        <div className="text-danger mt-3">{error.message}</div>
      )}

      <div className="d-flex justify-content-center mt-4">
        <BaseButton
          text={isResumeUploading ? "Uploading..." : "Submit"}
          type="button"
          onClick={handleSubmit}
          disabled={isResumeUploading}
        />
      </div>
    </div>
  );
};

export default CreateApplication;
