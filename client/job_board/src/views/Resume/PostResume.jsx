import React, { useState } from 'react';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const PostResume = () => {

  const [fileData, setFileData] = useState({
    jobSeekerId:Number(localStorage.getItem('userId')),
    filePath:"",
  });

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

  const handleSubmit = async () => {
    try {
      
      console.log(fileData);
      
      const response = await axios.post(`http://localhost:8080/resume/add`, fileData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      console.log(response.data);
      nav('/');
    } catch (error) {
      console.error('Error posting resume:', error);
    }

  }
  return (
    <div>
      <h1>Post Resume</h1>
      <p>Here you can post your resume.</p>

      <label text="CV" />
      <input
        className = "input-field"
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx"
      />
      <BaseButton text="Post Resume" onClick={handleSubmit} />
    </div>
  );
}
export default PostResume;