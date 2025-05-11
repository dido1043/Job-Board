import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseButton from '../../components/shared/BaseButton';
import '../../assets/jobPostPage.css';
import CreateJobPost from './CreateJobPost';
const JobPostPage = () => {
  const [id, setId] = useState(window.location.pathname.split('/').pop());

  const [jobPost, setJobPost] = useState({});

  const [recruier, setRecruiter] = useState();

  const [isEditBtn, setIsEditBtn] = useState(false);
  const [error, setError] = useState({
    message: ''
  });
  const nav = useNavigate();
  const getRecruiter = async (recruiterId) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/get-username/${recruiterId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      setRecruiter(response.data);
    } catch (error) {
      setError({
        message: 'Error fetching recruiter details'
      });
    }
  }
  //Fetch the job post details using the id
  useEffect(() => {
    console.log(id);

    const getCurrentJobPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/post/get/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });
        setJobPost(response.data);
        await getRecruiter(response.data.recruiterId);
      } catch (err) {
        setError({
          message: 'Error fetching job post'
        });
      }
    };

    getCurrentJobPost();
  }, []);


  const toggleEditBtn = () => {
    setIsEditBtn(!isEditBtn);
  }

  const deleteJobPost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/post/delete/${jobPost.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      nav('/jobs/all');

    } catch (error) {
      setError({
        message: 'Error deleting job post'
      });

    }
  }

  const redirectToPostResume = () => {
    nav('/resume/post');
  }
  return (
    <div>
      {!isEditBtn ?
        <div className="container py-5">
          <h1 className="display-4 text-center mb-3">Job Post Page</h1>
          <p className="lead text-center ">This is the job post page.</p>

          <div className="card shadow-sm mx-auto mt-4 job-card">
            <div className="card-body text-center">
              <h2 className="card-title mb-3">{jobPost.title}</h2>

              <p className="text-muted">
                📍 <span className="fw-semibold">{jobPost.location}</span>
              </p>

              <p className="text-muted">
                💼 <span className="fw-semibold">{recruier}</span>
              </p>

              <p className="text-muted">
                💰 <span className="fw-semibold">{jobPost.salary} bgn</span>
              </p>
              <p className="text-muted">
              💻 <span className="fw-semibold">{jobPost.seniority}</span>
              </p>
              <p className="mt-3">{jobPost.description}</p>

              <p className="text-muted">Skills: {jobPost.skills && jobPost.skills.map((skill, index) => (
                <span key={index} className="badge bg-secondary me-1">{skill}</span>
              ))}</p>
              

              {localStorage.getItem('username') === recruier ?
                <div className="mt-3">
                  <BaseButton text="Edit" type="button" onClick={toggleEditBtn} />

                  <button type='button' className="btn btn-danger mt-3" onClick={deleteJobPost}>Delete</button>
                </div> :
                <>
                <BaseButton text="Apply" type="button" onClick={() => redirectToPostResume()} />
                </>}
            </div>

          </div>
        </div> :
        <CreateJobPost isEditable={isEditBtn} jpData={jobPost} />
      }
    </div>

  );
}

export default JobPostPage;