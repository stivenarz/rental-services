import React, { useState, useRef, useEffect } from "react";
import "./TechniciansModal.css";

/** 
 * Lista predefinida de especialidades disponibles para seleccionar. 
 * @type {string[]}
 */
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

/**
 * @typedef {Object} Technician
 * @property {string} id - ID del técnico.
 * @property {string} name - Nombre del técnico.
 * @property {string} email - Correo del técnico.
 * @property {string} phone - Teléfono del técnico.
 * @property {string[]} specialties - Lista de especialidades asignadas.
 */

/**
 * @typedef {Object} TechnicianModalProps
 * @property {Technician} technician - Objeto del técnico a editar.
 * @property {Function} onClose - Función para cerrar el modal.
 * @property {(updatedTech: Technician) => void} onUpdate - Función que recibe los datos actualizados del técnico.
 */

/**
 * Modal para editar la información de un técnico.
 *
 * Permite actualizar:
 * - nombre  
 * - email  
 * - teléfono  
 * - lista de especialidades (multi-select con búsqueda)
 *
 * Incluye:
 * - filtrado en vivo  
 * - selección con teclado  
 * - cierre automático del dropdown al hacer clic afuera  
 *
 * @param {TechnicianModalProps} props - Propiedades del modal.
 * @returns {JSX.Element}
 */
export default function TechnicianModal({ technician, onClose, onUpdate }) {
  /** @type {[string, Function]} */
  const [name, setName] = useState(technician.name);

  /** @type {[string, Function]} */
  const [email, setEmail] = useState(technician.email);

  /** @type {[string, Function]} */
  const [phone, setPhone] = useState(technician.phone);

  /** @type {[string[], Function]} */
  const [selectedSpecs, setSelectedSpecs] = useState([...technician.specialties]);

  /** @type {[string, Function]} */
  const [inputValue, setInputValue] = useState("");

  /** @type {[boolean, Function]} */
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /** @type {React.MutableRefObject<HTMLDivElement | undefined>} */
  const inputRef = useRef();

  /**
   * Lista filtrada de especialidades según lo escrito
   * y excluyendo las que ya están seleccionadas.
   */
  const filteredSpecs = specialtiesList.filter(
    (spec) =>
      spec.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedSpecs.includes(spec)
  );

  /**
   * Agrega una especialidad seleccionada.
   * @param {string} spec - Especialidad seleccionada.
   */
  const toggleSpec = (spec) => {
    if (!selectedSpecs.includes(spec)) {
      setSelectedSpecs([...selectedSpecs, spec]);
      setInputValue("");
      setDropdownOpen(true);
    }
  };

  /**
   * Elimina una especialidad seleccionada.
   * @param {string} spec - Especialidad a eliminar.
   */
  const removeSpec = (spec) => {
    setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
  };

  /**
   * Guarda los cambios del técnico y llama al callback `onUpdate`.
   */
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

  /**
   * Maneja eventos del teclado dentro del input de especialidades:
   * - Enter → añade el primer resultado filtrado  
   * - Escape → cierra el dropdown  
   * - Backspace (input vacío) → elimina la última especialidad
   *
   * @param {KeyboardEvent} e
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredSpecs.length > 0) {
      e.preventDefault();
      toggleSpec(filteredSpecs[0]);
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    } else if (e.key === "Backspace" && inputValue === "" && selectedSpecs.length > 0) {
      setSelectedSpecs(selectedSpecs.slice(0, -1));
    }
  };

  /**
   * Detecta clics fuera del dropdown para cerrarlo.
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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

        <div
          className="multi-select-container"
          ref={inputRef}
          onClick={() =>
            inputRef.current.querySelector("input").focus()
          }
        >
          <div className="multi-select-display">
            {selectedSpecs.map((spec) => (
              <div className="multi-tag" key={spec}>
                {spec}
                <span
                  className="multi-tag-close"
                  onClick={() => removeSpec(spec)}
                >
                  ×
                </span>
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
          <button className="tech-btn cancel" onClick={onClose}>
            Cerrar
          </button>
          <button className="tech-btn save" onClick={saveChanges}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
