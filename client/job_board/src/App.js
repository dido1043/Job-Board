import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AllJobPosts from './views/JobPosts/AllJobPosts';
import Header from './components/navigation/Header';
import Login from './views/User/Login';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/all" element={<AllJobPosts />} />
        <Route path="/login" element={<Login />} />
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
