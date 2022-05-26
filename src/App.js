import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";


function App() {
  const navigate = useNavigate();

  useEffect(() => navigate('/identify'), []);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
