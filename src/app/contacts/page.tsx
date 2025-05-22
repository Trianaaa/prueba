'use client'; // Directiva de Next.js para indicar que este componente se renderiza del lado del cliente

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Tipo de dato para representar un usuario
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean; // true si el usuario está activo
};

// Tipo para un nuevo usuario (sin id ni status, que se generan automáticamente)
type NewUser = Omit<User, 'id' | 'status'>;

// Validación simple de email usando expresión regular
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Componente principal de la página
export default function ContactsPage() {
  // Estado que contiene la lista de usuarios
  const [users, setUsers] = useState<User[]>([]);
  // Estado para manejar los datos del nuevo usuario
  const [newUser, setNewUser] = useState<NewUser>({ firstName: '', lastName: '', email: '' });
  // Estado para mostrar una pantalla de carga
  const [loading, setLoading] = useState(true);
  // Estado para errores de carga de datos
  const [error, setError] = useState<string | null>(null);

  // Hook que se ejecuta al montar el componente para obtener los usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://api.fake-rest.refine.dev/users');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: User[] = await res.json();
        // Solo guardar usuarios con estado activo (status: true)
        setUsers(data.filter(user => user.status));
      } catch (err: any) {
        // Manejo de errores de red o servidor
        setError(`No se pudieron cargar los usuarios: ${err.message}`);
      } finally {
        // Finaliza el estado de carga
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Función para agregar un nuevo usuario localmente
  const handleAddUser = () => {
    const { firstName, lastName, email } = newUser;

    // Validaciones de campos vacíos
    if (!firstName || !lastName || !email) {
      alert("Complete todos los campos.");
      return;
    }

    // Validación de correo electrónico
    if (!isValidEmail(email)) {
      alert("Correo electrónico inválido.");
      return;
    }

    // Generar nuevo ID basado en el ID más alto actual
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // Crear el nuevo usuario con status activo
    const userToAdd: User = { id: newId, ...newUser, status: true };

    // Agregar el usuario a la lista (solo localmente)
    setUsers(prev => [...prev, userToAdd]);
    // Limpiar formulario
    setNewUser({ firstName: '', lastName: '', email: '' });
    alert("Usuario agregado localmente.");
  };

  // Función para eliminar un usuario localmente
  const handleDeleteUser = (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    setUsers(prev => prev.filter(user => user.id !== id));
    alert("Usuario eliminado localmente.");
  };

  return (
    <div className="p-5 min-h-screen bg-gray-50 flex flex-col items-center">
      
      {/* Botón para volver al inicio */}
      <div className="w-full max-w-4xl mb-4 text-left">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          title="Volver"
        >
          &larr; Volver
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestión de Usuarios</h1>

      {/* Sección del formulario para agregar usuario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Agregar Nuevo Usuario</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Campo Nombre */}
          <input
            type="text"
            placeholder="Nombre"
            value={newUser.firstName}
            onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
          {/* Campo Apellido */}
          <input
            type="text"
            placeholder="Apellido"
            value={newUser.lastName}
            onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
          {/* Campo Email */}
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Botón para agregar usuario */}
        <button
          onClick={handleAddUser}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          AGREGAR USUARIO
        </button>
      </div>

      {/* Sección de la tabla con los usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Usuarios Activos</h2>

        {/* Estado de carga */}
        {loading && <p className="text-center text-gray-500">Cargando usuarios...</p>}
        {/* Mensaje de error si falla la API */}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {/* Mostrar tabla si hay usuarios */}
        {!loading && !error && (
          users.length === 0 ? (
            <p className="text-center text-gray-500">No hay usuarios activos.</p>
          ) : (
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
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.firstName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.lastName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        {/* Botón para eliminar usuario */}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                          title="Eliminar usuario"
                        >
                          {/* Ícono de papelera (SVG) */}
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

      {/* Pie de página con créditos */}
      <footer className="text-sm text-center text-gray-500 mt-8 w-full max-w-4xl">
        Prueba creada para Ingenio Colombiano por Pablo Triana - 2025
      </footer>
    </div>
  );
}

