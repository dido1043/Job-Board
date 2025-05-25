import React, { use, useState, useEffect } from 'react';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostResume = ({ onResumePosted, onUploadStart  }) => {

  const [fileData, setFileData] = useState({
    jobSeekerId: Number(localStorage.getItem('userId')),
    filePath: "",
  });
  const [resumeId, setResumeId] = useState(null);
  const nav = useNavigate();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFileData((prev) => ({ ...prev, filePath: reader.result }));
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (onUploadStart) onUploadStart();
    try {

      console.log(fileData);

      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/resume/add`, fileData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      const returnedResumeId = response.data.id; // Adjust based on backend shape
      setResumeId(returnedResumeId);
      if (onResumePosted) {
        onResumePosted(returnedResumeId); // callback to parent
      }
      console.log(response.data);
      //nav('/');
    } catch (error) {
      console.error('Error posting resume:', error);
    }

  }


  return (
    <div className='container mt-5 mb-5'>
      {/* <h2 className='text-center mt-4 mb-5'>Upload CV</h2>  <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileChange} /> */}
      <InputField id="formFileLg" type="file" onChange={handleFileChange} />
      <div className="d-flex justify-content-center mt-4">
        <BaseButton text="Post Resume" onClick={handleSubmit} className="btn btn-primary" />
      </div>
    </div>
  );
}
export default PostResume;