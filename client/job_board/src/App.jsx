import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/all" element={<AllJobPosts />} />
        <Route path="/jobs/recommended/:userId" element={<RecommendedJobs />} />
        <Route path="/jobs/create" element={<CreateJobPost />} />
        <Route path="/job/:jobId" element={<JobPostPage />} />
        <Route path="/resume/post" element={<PostResume />} />
        <Route path="/resume/show/:userId" element={<ShowResumes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:userId" element={<UserPage />} />
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
