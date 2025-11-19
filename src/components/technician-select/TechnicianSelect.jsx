import Select from "react-select";
import { useState } from "react";

export default function TechnicianSelect({ technicians, agenda, setAgenda }) {
  
  const options = technicians.map(t => ({
    value: t.id,
    label: t.name
  }));

  const handleChange = (selected) => {
    setAgenda({
      ...agenda,
      technician_id: selected ? selected.value : null
    });
  };

  return (
    <Select
      options={options}
      value={options.find(o => o.value === agenda.technician_id) || null}
      onChange={handleChange}
      placeholder="Seleccione un técnico"
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "10px",
          padding: "4px",
        })
      }}
    />
  );
}
