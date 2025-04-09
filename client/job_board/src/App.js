import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AllJobPosts from './views/JobPosts/AllJobPosts';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/all" element={<AllJobPosts />} />
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
