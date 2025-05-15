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
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userRole, setUserRole] = useState();
  const [candidateForAdmin, setCandidateForAdmin] = useState();
  const [activeSection, setActiveSection] = useState('info');
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

  const redirectToMyFiles = () => {
    navigate(`/resume/show/${userId}`);
  }
    return (
    <div className="d-flex min-vh-100">
      <aside className="bg-light p-3 border-end shadow-sm" style={{ width: '250px', minHeight: '100vh' }}>
        <h4 className="text-primary mb-4">Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => setActiveSection('info')}>
              <i className="bi bi-person-circle me-2"></i>User Info
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => setActiveSection('skills')}>
              <i className="bi bi-tools me-2"></i>Skills
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => setActiveSection('seniority')}>
              <i className="bi bi-bar-chart-line me-2"></i>Seniority
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => setActiveSection('jobs')}>
              <i className="bi bi-briefcase me-2"></i>Recommended Jobs
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => redirectToMyFiles()}>
              <i className="bi bi-briefcase me-2"></i> My files
            </button>
          </li>
          {localStorage.getItem('userRole') === 'ADMIN' && (
            <li className="nav-item mb-2">
              <button className="btn btn-link text-decoration-none text-dark fw-bold" onClick={() => setActiveSection('admin')}>
                <i className="bi bi-shield-lock me-2"></i>Admin Panel
              </button>
            </li>
          )}
          <li className="nav-item mb-2">
            <button className="btn btn-danger w-100 fw-bold" onClick={LogoutFn}>
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </li>
          <li className="nav-item mt-3">
            <button className="btn btn-outline-danger w-100 fw-bold" onClick={deleteUser}>
              <i className="bi bi-trash me-2"></i>Delete Me
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-grow-1 p-4">
        <h1>Hello <span className="text-primary">{username}</span>!</h1>

        {activeSection === 'info' && (
          <div className="user-info-box mb-4 p-3 border rounded">
            <h3>User Information</h3>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Role:</strong> {localStorage.getItem('userRole')}</p>
            <p><strong>Seniority:</strong> {seniority}</p>
            <p><strong>Skills:</strong> {allSkills.length > 0 ? allSkills.join(', ') : 'No skills added'}</p>
          </div>
        )}

        {activeSection === 'skills' && (
          <form onSubmit={addSkillsToUser}>
            <InputField
              label="Add Skill:"
              type="text"
              name="skills"
              id="skills"
              onChange={handleSkillsChange}
              className="form-control"
              placeholder="Enter skill"
            />
            <BaseButton text="Add skill" type="submit" />
          </form>
        )}

        {activeSection === 'seniority' && (
          <div>
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
            <div className="mt-2">
              <BaseButton text="Set Seniority" type="button" onClick={addSeniorityToUser} />
            </div>
            {isSetSeniority && (
              <div className="alert alert-success mt-2" role="alert">
                Now you are {seniority}
              </div>
            )}
          </div>
        )}

        {activeSection === 'jobs' && (
          <BaseButton text="Show recommended jobs" type="button" onClick={() => redirectToRecommendedJobs(userId)} />
        )}
       
        {activeSection === 'admin' && localStorage.getItem('userRole') === 'ADMIN' && (
          <div>
            <h2 className='text-secondary'>Make admin</h2>
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
          </div>
        )}

        <div className="mt-3">
          <BaseButton text="Become recruiter" type="button" onClick={becomeRecruiter} />
          {isBecomeRecruiter && (
            <div className="alert alert-success mt-2" role="alert">
              You are now a recruiter
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default UserPage;