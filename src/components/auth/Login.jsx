import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLS } from "../../services/localStorageService";
import apiService from "../../services/apiService";
import {toast} from "react-hot-toast";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
    .post('users/login', formData)
    .then(userLogged => {
      setLS('user', userLogged)
      navigate('/')
    })
    .catch(error => toast.error(error.detail))
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Log in to continue</p>

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">Log In</button>

        <div className="login-links">
          <a href="/recovery">Forgot your password?</a>
          <a href="/register">Create an account</a>
        </div>
      </form>
    </div>
  );
}
