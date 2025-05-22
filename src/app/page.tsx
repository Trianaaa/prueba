import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Contenido principal */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Introducción */}
        <div className="text-center sm:text-left max-w-xl">
          <h1 className="text-3xl font-bold mb-4">Prueba Técnica - Gestión de Usuarios</h1>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Esta aplicación permite consultar, agregar y eliminar usuarios usando una API externa.
            Se muestran únicamente los usuarios activos y se brinda una interfaz amigable para gestionar
            sus datos. Desarrollada con NextJS + React, TailwindCSS y desplegada en Vercel para facilitar su evaluación.
          </p>
        </div>

        {/* Botón de navegación */}
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