import './App.css';
import Register from './components/register';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;