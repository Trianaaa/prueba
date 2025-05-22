"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Github } from "lucide-react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
};

type NewUser = Omit<User, "id" | "status">;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://api.fake-rest.refine.dev/users");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data.filter((user) => user.status));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`No se pudieron cargar los usuarios: ${err.message}`);
        } else {
          setError("No se pudieron cargar los usuarios: Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    const { firstName, lastName, email } = newUser;
    if (!firstName || !lastName || !email) {
      alert("Complete todos los campos.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Correo electrónico inválido.");
      return;
    }

    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const userToAdd: User = { id: newId, ...newUser, status: true };
    setUsers((prev) => [...prev, userToAdd]);
    setNewUser({ firstName: "", lastName: "", email: "" });
    alert("Usuario agregado localmente.");
  };

  const handleDeleteUser = (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    setUsers((prev) => prev.filter((user) => user.id !== id));
    alert("Usuario eliminado localmente.");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } p-5 min-h-screen flex flex-col items-center transition-all duration-300`}
    >
      {/* Barra superior con GitHub + Toggle Dark Mode */}
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            &larr; Volver
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Trianaaa/prueba/tree/Prueba_ingco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Github className="w-6 h-6" />
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Gestión de Usuarios</h1>

      {/* Formulario de agregar usuario */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-md mb-8 w-full max-w-4xl`}
      >
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Usuario</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            className="border border-gray-300 p-2 rounded-md text-black"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            className="border border-gray-300 p-2 rounded-md text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded-md text-black"
          />
        </div>
        <button
          onClick={handleAddUser}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          AGREGAR USUARIO
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-md w-full max-w-4xl`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Lista de Usuarios Activos
        </h2>

        {loading && <p className="text-center">Cargando usuarios...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            {users.length === 0 ? (
              <p className="text-center">No hay usuarios activos.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead
                    className={`${
                      darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={
                      darkMode
                        ? "bg-gray-800 divide-y divide-gray-700"
                        : "bg-white divide-y divide-gray-200"
                    }
                  >
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 text-sm font-medium">
                          {user.firstName}
                        </td>
                        <td className="px-6 py-4 text-sm">{user.lastName}</td>
                        <td className="px-6 py-4 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="text-sm text-center mt-8 w-full max-w-4xl text-gray-500">
        Prueba creada para Ingenio Colombiano por Pablo Triana - 2025
      </footer>
    </div>
  );
}
