import React, { useState } from "react";
import toast from "react-hot-toast";
import "./profile.css";

export default function Profile() {
  const [form, setForm] = useState({
    name: "Stiven Arz",
    email: "stiven@example.com",
    phone: "3001234567",
    address: "Bogotá, Colombia"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("Perfil guardado:", form);
    toast.success("Perfil actualizado exitosamente.");
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-box">
        <h2 className="profile-title">Mi Perfil</h2>
        <p className="profile-sub">Administra tu información personal</p>

        {/* Avatar */}
        <div className="profile-avatar">
          <img
            src="https://ui-avatars.com/api/?name=Stiven+Arz&background=6f6ff5&color=fff"
            alt="avatar"
          />
        </div>

        {/* Form */}
        <div className="profile-form">

          <div className="profile-field">
            <label>Nombre completo</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Correo electrónico</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="profile-field">
            <label>Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Dirección</label>
            <input
              name="address"
              value={form.address}
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
