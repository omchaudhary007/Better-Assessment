import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    else
    setIsLoggedIn(false)
    console.log(token)
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <h3 style={{ fontSize: '2rem',padding:'1rem' }}>Welcome, to the Home page</h3> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
