import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import ApiKey from '../components/ApiKey';
import Sidebar from 'components/Sidebar';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}
