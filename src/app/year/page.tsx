"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Year() {
  const [year, setYear] = useState<string>("");

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value); // Mantener el valor como cadena
  };

  const handleIsBisiesto = () => {
    const currentYear = parseInt(year, 10);

    if (!year || isNaN(currentYear)) {
      alert("Por favor, ingresa un número válido.");
      return;
    }

    const esBisiesto = (year: number): boolean =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    if (esBisiesto(currentYear)) {
      alert(`El año ${currentYear} es un año bisiesto.`);
    } else {
      alert(`El año ${currentYear} no es un año bisiesto.`);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1>AÑO BISIESTO</h1>
          <TextField
            className="font-[family-name:var(--font-geist-sans)]"
            id="year-input"
            label="Ingresa un año"
            type="text" // Cambiar a "text" para evitar conflictos
            variant="standard"
            value={year}
            onChange={handleYearChange}
          />
          <Button
            className="font-[family-name:var(--font-geist-sans)]"
            variant="contained"
            color="primary"
            onClick={handleIsBisiesto}
          >
            Es bisiesto?
          </Button>
        </div>
      </main>
    </div>
  );
}
