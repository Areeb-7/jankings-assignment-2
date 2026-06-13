// Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
// Using backend JWT auth instead of Firebase


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3010';
      const resp = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      let data;
      try {
        data = await resp.json();
      } catch (err) {
        data = { message: resp.statusText || 'No response body' };
      }
      if (!resp.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/');
  } catch (err) {
      console.log(err);
  }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2><b>Login</b></h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Login</button>
        <p className="p">If you don't have account 
          <Link className="Link" to={"/createaccount"}>  Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
