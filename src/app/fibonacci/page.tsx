"use client";

import { TextField } from "@mui/material";
import { useState } from "react";

export default function Year() {
  const [numero, setNumero] = useState<number>(0);

  // Generar la secuencia de Fibonacci hasta un número dado
  function genFibonacci(hastaNumero: number): number[] {
    if (hastaNumero < 0) return []; // Caso base para números negativos

    const fibonacci: number[] = [0, 1];
    while (true) {
      const siguienteNumero =
        fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
      if (siguienteNumero > hastaNumero) break;
      fibonacci.push(siguienteNumero);
    }

    return fibonacci;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1>SUCESIÓN DE FIBONACCI</h1>
          <TextField
            id="numero"
            label="Número"
            type="number"
            value={numero}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNumero(Number(e.target.value))
            }
          />
          {numero > 0 && (
            <div className="flex flex-col gap-4">
              <h2>Resultado</h2>
              <div className="flex flex-col gap-2">
                {genFibonacci(numero).map((num, index) => (
                  <div key={index}>{num}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
