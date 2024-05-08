import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import { GET_CLIENTS_BY_SELLER, UPDATE_CLIENT, DELETE_CLIENT, ADD_CLIENT } from './queries/queries.js'; // Asegúrate de importar tus consultas GraphQL


const AdmClient = () => {
    const [clients, setClients] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [clientToEdit, setClientToEdit] = useState(null);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [clientToAdd, setClientToAdd] = useState(null);
    const [client, setClient] = useState({
        name: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        email: '',
        password: ''
    });


    const [updateClient] = useMutation(UPDATE_CLIENT);
    const [deleteClient] = useMutation(DELETE_CLIENT);
    const [addClient] = useMutation(ADD_CLIENT);
    const [getClientsBySeller] = useLazyQuery(GET_CLIENTS_BY_SELLER);

    useEffect(() => {
        getClients(); // Para ejecutar la consulta al montar el componente y cuando haya cambios
    }, []);


    const getClients = async () => {
        try {
            const seller = JSON.parse(localStorage.getItem('seller'));
            const responseData = await getClientsBySeller({
                variables: {
                    getClientsBySellerId: seller.id
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            console.log(responseData);
            setClients(responseData.data.getClientsBySeller);

        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    }


    const handleEditClient = async () => {
        try {
            console.log(clientToEdit.id);

            const seller = JSON.parse(localStorage.getItem('seller'));
            const { responseData } = await updateClient({

                variables: {
                    clientUpdateId: clientToEdit.id,
                    input: {
                        name: clientToEdit.name,
                        lastName: clientToEdit.lastName,
                        email: clientToEdit.email,
                        password: clientToEdit.password,
                        company: clientToEdit.company,
                        phoneNumber: clientToEdit.phoneNumber
                    },
                    updateSellerId: seller.id
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            setShowEditModal(false);
            await getClients();
        } catch (error) {
            console.error('Error al cambiar datos del cliente', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {

            const { responseData } = await deleteClient({
                variables: {
                    deleteClientId: clientToDelete.id
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            setShowDeleteModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    const handleAddClient = async () => {
        try {
            const { responseData } = await addClient({
                variables: {
                    input: {
                        name: clientToAdd.name,
                        lastName: clientToAdd.lastName,
                        email: clientToAdd.email,
                        password: clientToAdd.password,
                        company: clientToAdd.company,
                        phoneNumber: clientToAdd.phoneNumber
                    }
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }

            });
            console.log(responseData);
            setShowAddModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar cliente:', error);
        }
    };

    const handleEditClick = (client) => {
        console.log("Edit button clicked", client);
        setClientToEdit(client);
        setShowEditModal(true);
    };

    const handleDeleteClick = (client) => {
        setClientToDelete(client);
        setShowDeleteModal(true);
    };

    const handleAddClick = () => {
        console.log("Add button clicked", client);
        setShowAddModal(true);
        setClientToAdd(client);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddClient();
    };

    

    return (

        <div className="text-white p-4 mt-5">
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
                            <Button variant="danger" onClick={() => handleDeleteClick(client)} className="m-lg-2">Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Button variant="primary" onClick={() =>handleAddClick(client)}>Agregar Cliente</Button>

            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                value={clientToEdit ? clientToEdit.name : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el apellido"
                                value={clientToEdit ? clientToEdit.lastName : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompany">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la empresa"
                                value={clientToEdit ? clientToEdit.company : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, company: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el teléfono"
                                value={clientToEdit ? clientToEdit.phoneNumber : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, phoneNumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el email"
                                value={clientToEdit ? clientToEdit.email : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese la contraseña"
                                value={clientToEdit ? clientToEdit.password : ''}
                                onChange={(e) => setClientToEdit({ ...clientToEdit, password: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => handleEditClient(clientToEdit)}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que quieres eliminar este cliente?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Eliminar
                    </Button>
                </Modal.Footer>
                </Modal>


            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                name="name"
                                value={clientToAdd ? clientToAdd.name : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el apellido"
                                name="lastName"
                                value={clientToAdd ? clientToAdd.lastName : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompany">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la empresa"
                                name="company"
                                value={clientToAdd ? clientToAdd.company : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, company: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el teléfono"
                                name="phoneNumber"
                                value={clientToAdd ? clientToAdd.phoneNumber : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, phoneNumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el email"
                                name="email"
                                value={clientToAdd ? clientToAdd.email : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese la contraseña"
                                name="password"
                                value={clientToAdd ? clientToAdd.password : ''}
                                onChange={(e) => setClientToAdd({ ...clientToAdd, password: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleAddModalClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>

    );
};

export default AdmClient;
