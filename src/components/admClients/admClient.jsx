import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditClientModal from './modals/editModal';

const AdmClient = () => {
    const [clients, setClients] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null); // Estado para almacenar los datos del cliente que se va a editar
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        getClients();
    }, []);

    let sellerId = '';
    const getClients = async () => {
        try {

            sellerId = JSON.parse( localStorage.getItem('seller'));
            console.log(sellerId);
            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    query: `
                     query GetClientsBySeller($getClientsBySellerId: ID) {
                      getClientsBySeller(id: $getClientsBySellerId) {
                        id
                        name
                        lastName
                        company
                        phoneNumber
                        email
                        password
                        created
                        seller
                      }
                    }
                    `,
                    variables: {
                        getClientsBySellerId: sellerId.id
                    }
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.data && responseData.data.getClientsBySeller) {
                setClients(responseData.data.getClientsBySeller);
            } else {
                console.error('No se encontraron clientes para este vendedor.');
            }
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    };


    const handleEditClick = (client) => {
        console.log("Edit button clicked", client);
        setClientToEdit(client); // Establece los datos del cliente que se va a editar
        setShowEditModal(true);
    };


    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleEditClient = async (editedClientData) => {
        /*try {
            // Realizar una solicitud para editar el cliente con los datos en 'editedClientData'
            const response = await fetch('http://localhost:4000/editClient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(editedClientData)
            });

            if (response.ok) {
                // Actualizar la lista de clientes después de la edición
                getClients();
                // Cierra el modal de edición
                setShowEditModal(false);
            } else {
                console.error('Error al editar el cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar el cliente:', error);
        } */
        console.log(editedClientData);
    };


    return (
        <div className="bg-dark text-white p-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Administrar Clientes</h2>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Empresa</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.lastName}</td>
                        <td>{client.company}</td>
                        <td>{client.phoneNumber}</td>
                        <td>{client.email}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleEditClick(client)}>Editar</Button>
                            <Button variant="danger" onClick={handleDeleteClick} className="m-lg-2">Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Button variant="primary" onClick={handleAddClick}>Agregar Cliente</Button>

            <EditClientModal
                show={showEditModal}
                handleClose={handleEditModalClose}
                clientData={clientToEdit}
                handleEdit={handleEditClient}
            />
        </div>
    );
};

export default AdmClient;
