import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdmClient = () => {
    const [clients, setClients] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [clientToAdd, setClientToAdd] = useState(null);
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
            sellerId = JSON.parse(localStorage.getItem('seller'));
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

    /*modal edit*/

    const handleEditClient = async () => {
        try {
            sellerId = JSON.parse(localStorage.getItem('seller'));
            console.log(sellerId);
            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    query: `
                    mutation ClientUpdate($clientUpdateId: ID!, $input: inputClient) {
                      clientUpdate(id: $clientUpdateId, input: $input) {
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
                            clientUpdateId: clientToEdit.id, // Asigna el ID del cliente que deseas actualizar
                            input: {
                                name: clientToEdit.name,
                                lastName: clientToEdit.lastName,
                                email: clientToEdit.email,
                                password: clientToEdit.password,
                                company: clientToEdit.company,
                                phoneNumber: clientToEdit.phoneNumber
                            },
                            updateSellerId: sellerId.id
                    }
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.data && responseData.data.clientUpdate) {
                console.log('Cambios guardados correctamente.');
                setShowEditModal(false);
                getClients();

            } else {
                console.error('No se encontro el cliente.');
            }
        } catch (error) {
            console.error('Error al cambiar datos del cliente', error);
        }
    };

    const handleEditClick = (client) => {
        console.log("Edit button clicked", client);
        setClientToEdit(client); // Establece los datos del cliente que se va a editar
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };


    /* delete modal */

    const handleDeleteConfirm = async () => {
        try {
            console.log(clientToDelete.id);
            if (clientToDelete) {
                const response = await fetch('http://localhost:4000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        query: `
                            mutation DeleteClient($deleteClientId: ID!) {
                                deleteClient(id: $deleteClientId)
                            }
                        `,
                        variables: {
                            deleteClientId: clientToDelete.id
                        }
                    })
                });

                const responseData = await response.json();
                console.log(responseData);
                if (responseData.data && responseData.data.deleteClient) {
                    console.log('Cliente eliminado correctamente.');
                    setShowDeleteModal(false);
                    getClients();
                } else {
                    console.error('Error al eliminar el cliente.');
                }
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };


    const handleDeleteClick = (client) => {
        setClientToDelete(client);
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };


    /* add modal */
    const handleAddClient = async () => {
        try {
            console.log(clientToAdd);
            sellerId = JSON.parse(localStorage.getItem('seller'));
            console.log(sellerId);

            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    query: `
                    mutation AddClient($input: InputClient!) {
                        newClient(input: $input) {
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
                        input: {
                            name: clientToAdd.name,
                            lastName: clientToAdd.lastName,
                            email: clientToAdd.email,
                            password: clientToAdd.password,
                            company: clientToAdd.company,
                            phoneNumber: clientToAdd.phoneNumber
                        }
                    }
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.data && responseData.data.newClient) {
                console.log('Cliente agregado correctamente.');
                setShowAddModal(false);
                getClients();
            } else {
                console.error('Error al agregar cliente.');
            }
        } catch (error) {
            console.error('Error al agregar cliente:', error);
        }
    };

    const handleAddClick = () => {
        console.log("Add button clicked", client);
        setShowAddModal(true);
        setClientToAdd(client);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddClient();
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
                        setShowAddModal(true);
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
