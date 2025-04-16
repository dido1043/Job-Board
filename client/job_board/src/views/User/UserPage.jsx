import React, { useState } from 'react';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';
import axios from 'axios';
const UserPage = () => {
  //todo: add user page logic
  const [seniority, setSeniority] = useState(null);
  const [skills, setSkills] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const [error, setError] = useState({
    message: ''
  });

  const handleSkillsChange = (e) => { 
    
    setSkills(e.target.value.split(',').map(skill => skill.trim()));
  }
  const addSkillsToUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/user/add-skills/${userId}`, skills, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      console.log(response.data);
    } catch (error) {
      setError({
        message: 'Error adding skills to user'
      });
    }
  }
  //--take user id from local storage  
  //--fetch user data from backend
  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <InputField label="Add Skill:" type="text" name="skills" id="skills"  onChange={handleSkillsChange} className="form-control" placeholder="Enter skill" />

          {skills.length > 0 ?
            <div className="mt-2">
              <p>Skills: {skills.join(', ')}</p>
            </div> : <></>
          }
          <BaseButton text="Add skill" type="submit" onClick={addSkillsToUser}/>
        </div>
        <div className="mb-3">
          <label htmlFor="seniority" className="form-label">Set Seniority:</label>
          <select
            id="seniority"
            className="form-select"
            onChange={(e) => setSeniority(e.target.value)}
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          <div className="d-flex gap-2 mt-2">

            <BaseButton text="Set Seniority" type="button" onClick={() => {
                // Logic to set seniority
                
                console.log(`Seniority set to: ${seniority}`);
              }}/>

          </div>
        </div>
        <div className="mb-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              // Logic to become recruiter
              console.log("User became a recruiter");
            }}
          >
            Become Recruiter
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              // Logic to make admin (for admins only)
              console.log("User made admin");
            }}
          >
            Make Admin
          </button>
        </div>
      </form>
    </div>
  );
}
export default UserPage;