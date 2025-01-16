"use client";
import { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Definir la interfaz de Contacto
interface Contact {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState<Contact>({ id: 0, name: '', phone: '', address: '', email: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Cargar contactos desde el LocalStorage al inicio
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    const { id, name, phone, address, email } = formData;

    // Validación
    if (!name || !email || !id) {
      alert('Id, Nombre y Email son obligatorios.');
      return;
    }

    // Validar formato del Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert('El Email no tiene el formato correcto.');
      return;
    }

    if (isEditing) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? { ...contact, name, phone, address, email } : contact
      );
      setContacts(updatedContacts);
      setIsEditing(false);
    } else {
      setContacts([...contacts, formData]);
    }

    // Guardar en LocalStorage
    localStorage.setItem('contacts', JSON.stringify([...contacts, formData]));
    setFormData({ id: 0, name: '', phone: '', address: '', email: '' });
  };

  const handleEditContact = (id: number) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setFormData(contactToEdit);
      setIsEditing(true);
    }
  };

  const handleDeleteContact = (id: number) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 className="font-[family-name:var(--font-geist-sans)] flex gap-8 leading-10">Gestión de Contactos</h1>

      <form>
        <div className="font-[family-name:var(--font-geist-sans)]" style={{ marginBottom: 40 }}>
          <TextField
            label="Id"
            type="number"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
            style={{ marginRight: 10 }}
          />
          <TextField
          className="font-[family-name:var(--font-geist-sans)]"
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ marginRight: 10 }}
          />
          <TextField
          className="font-[family-name:var(--font-geist-sans)]"
            label="Teléfono"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
          />
          <TextField
          className="font-[family-name:var(--font-geist-sans)]"
            label="Dirección"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{ marginRight: 10 }}
          />
          <TextField
            className="font-[family-name:var(--font-geist-sans)]"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ marginRight: 10 }}
          />
        </div>
        <Button className="font-[family-name:var(--font-geist-sans)]" variant="contained" color="primary" onClick={handleAddContact}>
          {isEditing ? 'Actualizar Contacto' : 'Agregar Contacto'}
        </Button>
      </form>

      <h2 className="font-[family-name:var(--font-geist-sans)] flex gap-8 leading-10">Lista de Contactos</h2>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Id</TableCell>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Nombre</TableCell>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Teléfono</TableCell>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Dirección</TableCell>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Email</TableCell>
              <TableCell className="font-[family-name:var(--font-geist-sans)]">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">{contact.id}</TableCell>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">{contact.name}</TableCell>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">{contact.phone}</TableCell>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">{contact.address}</TableCell>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">{contact.email}</TableCell>
                <TableCell className="font-[family-name:var(--font-geist-sans)]">
                  <Button className="font-[family-name:var(--font-geist-sans)]" onClick={() => handleEditContact(contact.id)} color="primary">Editar</Button>
                  <Button className="font-[family-name:var(--font-geist-sans)] bg-red-600 text-white " onClick={() => handleDeleteContact(contact.id)} color="secondary" style={{ marginLeft: 10 }}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
