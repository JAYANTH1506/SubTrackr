import React from "react";

const Navbar = ({ token, setToken, currentView, setView }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">SubTrackr</h1>
      <div>
        {token ? (
          <button className="secondary" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="primary" onClick={() => setView("login")}>Login</button>
            <button className="secondary" onClick={() => setView("register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
