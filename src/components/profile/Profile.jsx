import React, { useState } from "react";
import { getLS, setLS } from '../../services/localStorageService'
import apiService from '../../services/apiService'
import toast from "react-hot-toast";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(getLS('user'))
  const [userForm, setUserForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });
  const logoUrl = `https://ui-avatars.com/api/?name=${user.name}&background=6f6ff5&color=fff`

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    apiService
    .update('users', user.id, userForm)
    .then(res => {
      setUser(res)
      setLS('user', res)
      toast.success("Perfil actualizado exitosamente.");
    })
    .catch(error => toast.error('Error al intentar actualizar tu perfil'))
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-box">
        <h2 className="profile-title">Mi Perfil</h2>
        <p className="profile-sub">Administra tu información personal</p>

        {/* Avatar */}
        <div className="profile-avatar">
          <img
            src={logoUrl}
            alt="avatar"
          />
        </div>

        {/* UserForm */}
        <div className="profile-userForm">

          <div className="profile-field">
            <label>Nombre completo</label>
            <input
              name="name"
              value={userForm.name}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Correo electrónico</label>
            <input
              name="email"
              value={userForm.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="profile-field">
            <label>Teléfono</label>
            <input
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Dirección</label>
            <input
              name="address"
              value={userForm.address}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        <button className="profile-btn" onClick={handleSave}>
          Guardar cambios
        </button>

      </div>
    </div>
  );
}
