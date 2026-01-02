import React, { useState } from "react";
import { registerUser } from "../services/api.js";

const Register = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(name, email, password);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (

      <div className="auth-container">
  <div className="auth-card">
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
</div>
  );
};

export default Register;

