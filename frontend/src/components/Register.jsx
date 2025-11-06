import React, { useState } from "react";
import { registerUser } from "../api/api";

const Register = ({ setView }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setSuccess("Registration successful! You can login now.");
      setTimeout(() => setView("login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Register</h2>
      {error && <p className="alert">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="primary">Register</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Already have an account? <span className="link" onClick={() => setView("login")}>Login</span>
      </p>
    </div>
  );
};

export default Register;
