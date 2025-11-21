import React, { useState } from "react";
import "./Auth.css";
import apiService from "../../services/apiService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isDeleted: false,
    role: 'user',
    password: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
    .post('users/', formData)
    .then(res => {
      toast.success('Usuario registrado correctamente, puedes iniciar sesion')
      navigate('/login')
    })
    .catch(error => toast.error('Error intentando registrar el usuario: ' + error.detail))
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create Account</h2>

        <div className="auth-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Teléfono</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Dirección</label>
          <input
            type="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-btn">Crear cuenta</button>
      </form>
    </div>
  );
}