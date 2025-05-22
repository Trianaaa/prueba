'use client';

import Link from "next/link";
import { Github, Sun, Moon } from "lucide-react";
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Botones flotantes */}
      <div className="fixed top-4 right-4 flex gap-3 z-50">
        {/* Botón GitHub */}
        <a
          href="https://github.com/Trianaaa/prueba/tree/Prueba_ingco"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <Github className="w-5 h-5 text-black dark:text-white" />
        </a>

        {/* Botón Modo Dark/Light */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-800" />
            )}
          </button>
        )}
      </div>

      {/* Contenido principal */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left max-w-xl">
          <h1 className="text-3xl font-bold mb-4">Prueba Técnica - Gestión de Usuarios</h1>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Esta aplicación permite consultar, agregar y eliminar usuarios usando una API externa.
            Se muestran únicamente los usuarios activos y se brinda una interfaz amigable para gestionar
            sus datos. Desarrollada con NextJS + React, TailwindCSS y desplegada en Vercel para facilitar su evaluación.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/contacts"
            rel="noopener noreferrer"
          >
            Gestión de Contactos
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 dark:text-gray-400 row-start-3">
        Prueba creada para Ingenio Colombiano por Pablo Triana - 2025
      </footer>
    </div>
  );
}
