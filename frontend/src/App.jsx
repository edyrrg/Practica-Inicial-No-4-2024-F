import './App.css';
import Login from './componentes/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Postear from './componentes/postear';
import PostList from './componentes/postList';
import Registro from './componentes/registro';
import Pass from './componentes/pass';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/postear" element={<Postear />} />
        <Route path="/postList" element={<PostList />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/pass'element={<Pass/>}/>
      </Routes>
    </Router>
  );
}

export default App;