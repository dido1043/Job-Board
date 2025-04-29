import React, { use, useEffect, useState } from 'react';
import InputField from '../../components/shared/InputField';
import BaseButton from '../../components/shared/BaseButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../assets/UserPage.css';

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


  const [isBecomeRecruiter, setIsBecomeRecruiter] = useState(false);
  const [isSetSeniority] = useState(false);


  const navigate = useNavigate();

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
      isSetSeniority(true);
      console.log(response.data);
      // if (response.data !== seniority) {

      //   //setSeniority(response.data);
      // }
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
    try {
      const response = await axios.post(`http://localhost:8080/user/become-recruiter/${userId}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      setIsBecomeRecruiter(true);
      localStorage.setItem('userRole', response.data);
      setUserRole(response.data);

    } catch (error) {
      setError({
        message: 'Error making user recruiter'
      });
    }
  }
  useEffect(() => {
    const getUserSeniority = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/get-seniority/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });
        console.log(response.data);
        
        setSeniority(response.data);
      } catch (error) {
        setError({
          message: 'Error fetching user seniority'
        });
      }
      
    }
    getUserSeniority();
  }, [])

  //Delete user
  const deleteUser = async (e) => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/delete/${userId}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      localStorage.clear();
      setUserRole(null);
      setUserId(null);
      setAllSkills([]);
      setSkills([]);
      setSeniority(null);
      setCandidateForAdmin(null);
      navigate('/login');
      window.location.reload();
    } catch (error) {
      setError({
        message: 'Error deleting user'
      });
    }
  }

  const redirectToRecommendedJobs = (userId) => {
    navigate(`/jobs/recommended/${userId}`);
  }
  const LogoutFn = () => {
    localStorage.clear();
    // setToken(null);
    navigate('/');
    window.location.reload();
    console.log("Logout function called");
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">Hello <span className="text text-primary">{localStorage.getItem('username')}</span>!</h1>

      <div className="user-info-box mb-4 p-3 border rounded">
        <h3>User Information</h3>
        <p><strong>Username:</strong> {localStorage.getItem('username')}</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Role:</strong> {localStorage.getItem('userRole')}</p>
        <p><strong>Seniority:</strong> {seniority}</p>
        <p><strong>Skills:</strong> {allSkills.length > 0 ? allSkills.join(', ') : 'No skills added'}</p> 
      </div>
      <form>
        <div className="mb-3">
          <InputField label="Add Skill:" type="text" name="skills" id="skills" onChange={handleSkillsChange} className="form-control" placeholder="Enter skill" />

          <BaseButton text="Add skill" type="submit" onClick={addSkillsToUser} />
        </div>
        <div className="mb-3">
          <BaseButton text="Show recommended jobs" type="button" onClick={() => redirectToRecommendedJobs(userId)} />
        </div>
        <div className="mb-3">
          <label htmlFor="seniority" className="form-label">Set Seniority:</label>
          <select
            id="seniority"
            className="form-select"
            onChange={seniorityOnChange}
            value={seniority}
          >
            <option value="" disabled defaultValue={seniority}>Select seniority</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          <div className="d-flex gap-2 mt-2">

            <BaseButton text="Set Seniority" type="button" onClick={addSeniorityToUser} />

          </div>
          {isSetSeniority ? <div className="alert alert-success" role="alert">
            Now you are {seniority}
          </div> : <></>}
        </div>
        <div className="become-recruiter-s mb-3 d-flex gap-2">
          <BaseButton text="Become recruiter" type="button" onClick={becomeRecruiter} />
          {isBecomeRecruiter ? <div className="alert alert-success" role="alert">
            You are now a recruiter
          </div> : <></>}
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
        <button type="button" className="btn btn-danger mt-2" onClick={LogoutFn}>Logout</button>

        <button type="button" className="btn btn-danger mt-2" onClick={deleteUser}>Delete me</button>
      </form>
      <br />
    </div>
  );
}
export default UserPage;