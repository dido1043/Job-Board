import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useLocation } from 'react';
import { useNavigate } from 'react-router-dom';

import AllJobPosts from './views/JobPosts/AllJobPosts';
import Header from './components/navigation/Header';
import Login from './views/User/Login';
import Register from './views/User/Register';
import UserPage from './views/User/UserPage';
import JobPostPage from './views/JobPosts/JobPostPage';
import CreateJobPost from './views/JobPosts/CreateJobPost';
import RecommendedJobs from './views/JobPosts/RecomendedJobs';
import PostResume from './views/Resume/PostResume';
import ShowResumes from './views/Resume/ShowResumes';
import AllApplications from './views/Application/AllApplications';
import CreateApplication from './views/Application/CreateApplication';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  // const location = useLocation();
  // let navigate = useNavigate();

  const checkExpirationTime = () => {
    console.log('checking expiration time')
    const expirationTime = localStorage.getItem('tokenExpiration')
    if (!expirationTime) {
      return
    }

    if (new Date().getTime() > parseInt(expirationTime, 10)) {
      localStorage.clear()
      //navigate('/')
      window.location.reload(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkExpirationTime, 60000);
    //window.location.reload(true);
    return () => {
      clearInterval(interval)
    };
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AllJobPosts />} />
        <Route path="/jobs/all" element={<AllJobPosts />} />
        {token != null ?
          <>
            <Route path="/jobs/recommended/:userId" element={<RecommendedJobs />} />
            <Route path="/jobs/create" element={<CreateJobPost />} />
            <Route path="/job/:jobId" element={<JobPostPage />} />
            <Route path="/resume/post" element={<PostResume />} />
            <Route path="/resume/show/:userId" element={<ShowResumes />} />
            <Route path="/applications/all/:jobId" element={<AllApplications />} />
            <Route path="/applications/create/:jobId" element={<CreateApplication />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </> : <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>}



      </Routes>
    </div>

  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
