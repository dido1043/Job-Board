import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AllJobPosts from './views/JobPosts/AllJobPosts';
import Header from './components/navigation/Header';
import Login from './views/User/Login';
import Register from './views/User/Register';
import UserPage from './views/User/UserPage';
import JobPostPage from './views/JobPosts/JobPostPage';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/all" element={<AllJobPosts />} />
        <Route path="/job/:jobId" element={<JobPostPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:userId" element={<UserPage/>} />
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
