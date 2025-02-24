import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage';
import Login from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Manager/DashboardPage';
import Tasks from './pages/Manager/TasksPage';
import Groups from './pages/Manager/GroupsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<RegisterPage/>} />
        <Route path="/manager/dashboard" element={<Dashboard/>} />
        <Route path="/manager/userTasks" element={<Tasks />} />
        <Route path="/manager/groupTasks/:groupId?" element={<Tasks />} />
        <Route path="/manager/groups" element={<Groups/>} />
      </Routes>
    </Router>
  );
}

export default App;