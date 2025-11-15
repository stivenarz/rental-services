import React, { useState, useRef, useEffect } from "react";
import "./TechniciansModal.css";

const specialtiesList = [
  "Plomería",
  "Electricidad",
  "Albañilería",
  "Pintura",
  "Carpintería",
  "Jardinería",
  "Cerrajería",
  "Herrería",
];

export default function TechnicianModal({ technician, onClose, onUpdate }) {
  const [name, setName] = useState(technician.name);
  const [email, setEmail] = useState(technician.email);
  const [phone, setPhone] = useState(technician.phone);
  const [selectedSpecs, setSelectedSpecs] = useState([...technician.specialties]);
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef();

  const filteredSpecs = specialtiesList.filter(
    (spec) =>
      spec.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedSpecs.includes(spec)
  );

  const toggleSpec = (spec) => {
    if (!selectedSpecs.includes(spec)) {
      setSelectedSpecs([...selectedSpecs, spec]);
      setInputValue("");
      setDropdownOpen(true);
    }
  };

  const removeSpec = (spec) => {
    setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
  };

  const saveChanges = () => {
    onUpdate({
      ...technician,
      name,
      email,
      phone,
      specialties: selectedSpecs,
    });
    onClose();
  };

  const handleKeyDown = (e) => {
  if (e.key === "Enter" && filteredSpecs.length > 0) {
    e.preventDefault();
    toggleSpec(filteredSpecs[0]);
  } else if (e.key === "Escape") {
    setDropdownOpen(false);
  } else if (e.key === "Backspace" && inputValue === "" && selectedSpecs.length > 0) {
    setSelectedSpecs(selectedSpecs.slice(0, selectedSpecs.length - 1));
  }
};


  // Click fuera para cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tech-modal-overlay">
      <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Detalles del Técnico</h3>

        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Teléfono</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Especialidades</label>
        <div className="multi-select-container" ref={inputRef} onClick={() => inputRef.current.querySelector("input").focus()}>
          <div className="multi-select-display">
            {selectedSpecs.map((spec) => (
              <div className="multi-tag" key={spec}>
                {spec} <span className="multi-tag-close" onClick={() => removeSpec(spec)}>×</span>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setDropdownOpen(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Escribe para buscar..."
            />
          </div>
          {dropdownOpen && filteredSpecs.length > 0 && (
            <div className="multi-select-dropdown">
              {filteredSpecs.map((spec) => (
                <div
                  key={spec}
                  className="multi-select-option"
                  onClick={() => toggleSpec(spec)}
                >
                  {spec}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tech-modal-buttons">
          <button className="tech-btn cancel" onClick={onClose}>Cerrar</button>
          <button className="tech-btn save" onClick={saveChanges}>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
