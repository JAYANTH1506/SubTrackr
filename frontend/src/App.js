import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [view, setView] = useState("login");

  return (
    <div>
      <Navbar token={token} setToken={setToken} currentView={view} setView={setView} />
      {!token && view === "login" && <Login setToken={setToken} setView={setView} />}
      {!token && view === "register" && <Register setView={setView} />}
      {token && <Dashboard token={token} setToken={setToken} />}
    </div>
  );
}

export default App;
