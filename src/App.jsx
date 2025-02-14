import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Manager/DashboardPage/DashboardPage';
import Staditics from './pages/Manager/StadisticsPage/StadisticsPage';
import Tasks from './pages/Manager/TasksPage/TasksPage';
import Login from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/manager/dashboard" element={<Dashboard/>} />
        <Route path="/manager/tasks" element={<Tasks/>} />
        <Route path="/manager/staditics" element={<Staditics/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;