import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Manager/DashboardPage/DashboardPage';
import Tasks from './pages/Manager/TasksPage/TasksPage';
import Login from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/manager/dashboard" element={<Dashboard/>} />
        <Route path="/manager/tasks" element={<Tasks/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;