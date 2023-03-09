import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';
// import 'tailwindcss/tailwind.css';

function Hello() {
  return (
    <div className="h-screen">
      <h1 className="text-green-500">Hello</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
