import React, { useState } from "react";
import { loginUser } from "../api/api";

const Login = ({ setToken, setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      {error && <p className="alert">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="primary">Login</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don't have an account? <span className="link" onClick={() => setView("register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
