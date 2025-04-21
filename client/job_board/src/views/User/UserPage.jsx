import React, { useEffect, useState } from 'react';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';
import axios from 'axios';
const UserPage = () => {

  const [seniority, setSeniority] = useState();
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userRole, setUserRole] = useState();
  const [candidateForAdmin, setCandidateForAdmin] = useState();
  const [error, setError] = useState({
    message: ''
  });


  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(',').map(skill => skill.trim()));
  }

  //Add skills to user
  const addSkillsToUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/user/add-skills/${userId}`, skills, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      setAllSkills(response.data);
      setSkills([]);
      console.log(allSkills);
      //console.log(response.data);
    } catch (error) {
      setError({
        message: 'Error adding skills to user'
      });
    }
  }

  //Fetch user skills
  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/show-skills/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });
        setAllSkills(response.data);
        console.log(allSkills);
      } catch (error) {
        setError({
          message: 'Error fetching user skills'
        });
      }
    }
    fetchUserSkills()
  }, [userId])
  //Set seniority to user
  const seniorityOnChange = (e) => {
    setSeniority(e.target.value);
  };
  const addSeniorityToUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/user/set-seniority/${userId}`, { seniority }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      console.log(response.data);
      if (response.data !== seniority) {
        setSeniority(response.data);
      }
    } catch (error) {
      setError({
        message: 'Error adding seniority to user'
      });
    }

  }
  //Make user admin 
  const makeAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/user/make-admin/${candidateForAdmin}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      console.log(response.data);
      localStorage.setItem('userRole', response.data);
      setUserRole(response.data);
    } catch (error) {
      setError({
        message: 'Error making user admin'
      });
    }

  }
  const handleCandidateIdChange = (e) => {
    setCandidateForAdmin(e.target.value);
  };
  //Become recruiter
  const becomeRecruiter = async (e) => {

  }
  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <InputField label="Add Skill:" type="text" name="skills" id="skills" onChange={handleSkillsChange} className="form-control" placeholder="Enter skill" />

          {allSkills.length > 0 ?
            <div className="mt-2">
              <p>Skills: {allSkills.map(s => <li>{s}</li>)}</p>
            </div> : <></>
          }
          <BaseButton text="Add skill" type="submit" onClick={addSkillsToUser} />
        </div>
        <div className="mb-3">
          <label htmlFor="seniority" className="form-label">Set Seniority:</label>
          <select
            id="seniority"
            className="form-select"
            onChange={seniorityOnChange}
            value={seniority}
          >
            <option value="" disabled>Select seniority</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          <div className="d-flex gap-2 mt-2">

            <BaseButton text="Set Seniority" type="button" onClick={addSeniorityToUser} />

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

        </div>
        {localStorage.getItem('userRole') === 'ADMIN' ? <div>
          <InputField
            label="User id:"
            type="text"
            name="userId"
            id="userId"
            value={candidateForAdmin}
            onChange={handleCandidateIdChange}
            className="form-control"
            placeholder="Enter user id"
          />
          <BaseButton text="Make admin" type="button" onClick={makeAdmin} />
        </div> : <></>}

      </form>
    </div>
  );
}
export default UserPage;