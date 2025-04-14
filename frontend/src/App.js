import './App.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
      <Routes>
          <Route 
            path="/" 
            element={<PrivateRoute loggedIn={loggedIn} element={<Home />} />} 
          />
          <Route 
            path="/login" 
            element={<PublicRoute loggedIn={loggedIn} element={<Login setLoggedIn={setLoggedIn} />} />} 
          />
          <Route 
            path="/register" 
            element={<PublicRoute loggedIn={loggedIn} element={<Register />} />} 
          />
          <Route 
            path="/home" 
            element={<PrivateRoute loggedIn={loggedIn} element={<Home />} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;