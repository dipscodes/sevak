import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Window from 'components/Window';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Window />} />
      </Routes>
    </Router>
  );
}
