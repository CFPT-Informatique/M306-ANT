import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;