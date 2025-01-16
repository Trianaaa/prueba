"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

export default function Year() {
  // Estado para el departamento seleccionado
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  // Objeto con los municipios por departamento
  const municipios: Record<string, string[]> = {
    cundinamarca: ["Bogota", "Chia", "Mosquera"],
    antioquia: ["Medellin", "Rionegro", "Guarne"],
    valle: ["Cali", "Palmira", "Buenaventura"],
  };

  // Maneja el cambio de selección
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1>LISTADOS DINÁMICOS</h1>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Departamentos</InputLabel>
            <Select
              className="font-[family-name:var(--font-geist-sans)]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedDepartment || ""}
              label="Departamentos"
              onChange={handleChange}
            >
              {Object.keys(municipios).map((dep, index) => (
                <MenuItem key={index} value={dep}>
                  {dep.charAt(0).toUpperCase() + dep.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Mostrar los municipios del departamento seleccionado */}
          {selectedDepartment && (
            <div>
              {municipios[selectedDepartment].map((municipio, index) => (
                <p key={index}>{municipio}</p>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
