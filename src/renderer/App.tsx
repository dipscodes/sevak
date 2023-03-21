import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Window from 'renderer/components/Window';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Window />} />
      </Routes>
    </Router>
  );
}
