import './App.css';
import Login from './componentes/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Postear from './componentes/postear';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/postear" element={<Postear />} />
      </Routes>
    </Router>
  );
}

export default App;