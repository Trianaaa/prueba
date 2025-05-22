'use client'; // Necesario en Next.js para habilitar hooks en componentes que se ejecutan en el cliente

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Tipo de datos para los usuarios que devuelve la API
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
};

export default function ContactsPage() {
  // Estados para usuarios, nuevo usuario, carga y errores
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, 'id' | 'status'>>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los usuarios desde la API
  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    fetch('https://api.fake-rest.refine.dev/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: User[]) => {
        // Logs de depuración
        console.log("------------------------------------------");
        console.log("DATOS CRUDOS (RAW) DE LA API RECIBIDOS:");
        console.log(data);
        console.log("------------------------------------------");

        // Filtrar usuarios activos (status: true)
        const activeUsers = data.filter((user) => user.status === true);
        console.log("USUARIOS FILTRADOS (status: true) PARA LA TABLA:");
        console.log(activeUsers);
        console.log("------------------------------------------");

        setUsers(activeUsers);
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        setError(`No se pudieron cargar los usuarios: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Hook para cargar usuarios una vez al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un usuario (solo frontend)
  const handleAddUser = () => {
  // Validación de campos vacíos
  if (!newUser.firstName || !newUser.lastName || !newUser.email) {
    alert("Por favor, complete todos los campos para agregar un usuario.");
    return;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newUser.email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }

  // Crear nuevo ID automáticamente
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  // Crear nuevo objeto de usuario
  const userToAdd: User = {
    id: newId,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    status: true,
  };

  // Agregar usuario a la lista
  setUsers([...users, userToAdd]);

  // Limpiar formulario
  setNewUser({ firstName: '', lastName: '', email: '' });

  alert("Usuario agregado (solo visible en el frontend, se perderá al recargar la página).");
};


  // Función para eliminar un usuario (solo frontend)
  const handleDeleteUser = (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    alert("Usuario eliminado (solo visible en el frontend, se perderá al recargar la página).");
  };

  return (
    <div className="p-5 min-h-screen bg-gray-50 flex flex-col items-center">
      
      {/* Botón para regresar */}
      <div className="w-full max-w-4xl mb-4 text-left">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          rel="noopener noreferrer"
          title="Volver a la página principal"
        >
          &larr; Volver a la página principal
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Gestión de Usuarios
      </h1>

      {/* Formulario para nuevo usuario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Agregar Nuevo Usuario</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleAddUser}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
          title="Agregar usuario"
        >
          AGREGAR USUARIO
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Usuarios Activos</h2>

        {loading && <p className="text-center text-gray-500">Cargando usuarios...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && users.length === 0 ? (
          <p className="text-center text-gray-500">No hay usuarios activos para mostrar.</p>
        ) : (
          !loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.firstName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.lastName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                          title="Eliminar usuario"
                        >
                          {/* Icono SVG de eliminar */}
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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
          )
        )}
      </div>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 mt-8 w-full max-w-4xl">
        Prueba creada para Ingenio Colombiano por Pablo Triana - 2025
      </footer>
    </div>
  );
}
