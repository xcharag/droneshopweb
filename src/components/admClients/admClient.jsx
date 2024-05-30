import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Form, ListGroup } from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_CLIENTS_BY_SELLER, UPDATE_CLIENT, DELETE_CLIENT, ADD_CLIENT, GET_REPORT_BEST_CLIENTS } from './gql/queries.js';
import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';

const clientSchema = yup.object().shape({
    name: yup.string().required('El nombre del cliente es requerido'),
    lastName: yup.string().required('El apellido del cliente es requerido'),
    company: yup.string().required('La empresa del cliente es requerida'),
    phoneNumber: yup.string().required('El teléfono del cliente es requerido'),
    email: yup.string().email('El email no es válido').required('El email del cliente es requerido'),
    password: yup.string().required('La contraseña del cliente es requerida')
});

const AdmClient = () => {
    const [clients, setClients] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBestClientModal, setShowBestClientModal] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null);
    const [clientToDelete, setClientToDelete] = useState(null);

    const [updateClient] = useMutation(UPDATE_CLIENT);
    const [deleteClient] = useMutation(DELETE_CLIENT);
    const [addClient] = useMutation(ADD_CLIENT);
    const [getClientsBySeller] = useLazyQuery(GET_CLIENTS_BY_SELLER);
    const [getBestClient] = useLazyQuery(GET_REPORT_BEST_CLIENTS);
    const [topBestClients, setTopBestClients] = useState([]);

    const initialValues = {
        name: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        email: '',
        password: '',
    }

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    const handleEditModalClose = () => setShowEditModal(false);

    const handleEditClient = (client) => {
        setClientToEdit(client);
        setShowEditModal(true);
    }

    const handleFormSubmit = async (values, actions, isEdit = false) => {
        try {
            if (isEdit) {
                const seller = JSON.parse(localStorage.getItem('seller'));
                await updateClient({
                    variables: {
                        clientUpdateId: clientToEdit.id,
                        input: {
                            name: values.name,
                            lastName: values.lastName,
                            email: values.email,
                            password: values.password,
                            company: values.company,
                            phoneNumber: values.phoneNumber
                        },
                        updateSellerId: seller.id
                    },
                    context: {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    }
                });
                handleEditModalClose();
            } else {
                await addClient({
                    variables: {
                        input: {
                            name: values.name,
                            lastName: values.lastName,
                            email: values.email,
                            password: values.password,
                            company: values.company,
                            phoneNumber: values.phoneNumber
                        }
                    },
                    context: {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    }
                });
                handleAddModalClose();
            }
            actions.resetForm();
            window.location.reload();
        } catch (error) {
            console.error('Error adding client:', error);
        } finally {
            actions.setSubmitting(false);
        }
    }

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


    const handleDeleteClick = (client) => {
        setClientToDelete(client);
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };
    const handleDeleteConfirm = async () => {
        try {

            await deleteClient({
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

    const getBestClientModalClose = () => {
        setShowBestClientModal(false);
    }


    const getReportBestClient = async () => {
        try {
            const seller = JSON.parse(localStorage.getItem('seller'));
            const responseData = await getBestClient({
                variables: {
                    getTopClientsId: seller.id
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            console.log(responseData);
            setTopBestClients(responseData.data.getTopClients);
            setShowBestClientModal(true);
        } catch (error) {
            console.error('Error al obtener el mejor cliente:', error);
        }
    };

    return (
        <div className="text-white p-4 mt-5">
            <div className="d-flex justify-content-between mb-3">
                <h2>Administrar Clientes</h2>
                <Button variant='success' onClick={getReportBestClient}>
                    Ver información mejor cliente
                </Button>
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
                                <Button variant="primary" onClick={() => handleEditClient(client)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(client)} className="m-lg-2">Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="primary" onClick={handleAddModalShow}>Agregar Cliente</Button>

            {clientToEdit && (
                <Modal show={showEditModal} onHide={handleEditModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Cliente</Modal.Title>
                    </Modal.Header>
                    <Formik
                        initialValues={clientToEdit}
                        validationSchema={clientSchema}
                        onSubmit={(values, actions) => handleFormSubmit(values, actions, true)}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Modal.Body>

                                    <Form.Group controlId="formName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Field type='text' name='name' as={Form.Control} placeholder='Nombre' />
                                        <ErrorMessage name='name' component='div' className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Apellido</Form.Label>
                                        <Field type='text' name='lastName' as={Form.Control} placeholder='Apellido' />
                                        <ErrorMessage name='lastName' component='div' className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formCompany">
                                        <Form.Label>Empresa</Form.Label>
                                        <Field type='text' name='company' as={Form.Control} placeholder='Empresa' />
                                        <ErrorMessage name='company' component='div' className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formPhoneNumber">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Field type='text' name='phoneNumber' as={Form.Control} placeholder='Teléfono' />
                                        <ErrorMessage name='phoneNumber' component='div' className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Field type='email' name='email' as={Form.Control} placeholder='Email' />
                                        <ErrorMessage name='email' component='div' className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Field type='password' name='password' as={Form.Control} placeholder='Contraseña' />
                                        <ErrorMessage name='password' component='div' className="text-danger" />
                                    </Form.Group>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleEditModalClose}>
                                        Cerrar
                                    </Button>
                                    <Button type='submit' variant="primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}

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
                <Formik
                    initialValues={initialValues}
                    validationSchema={clientSchema}
                    onSubmit={(values, actions) => handleFormSubmit(values, actions)}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Field type='text' name='name' as={Form.Control} placeholder='Nombre' />
                                    <ErrorMessage name='name' component='div' className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formLastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Field type='text' name='lastName' as={Form.Control} placeholder='Apellido' />
                                    <ErrorMessage name='lastName' component='div' className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formCompany">
                                    <Form.Label>Empresa</Form.Label>
                                    <Field type='text' name='company' as={Form.Control} placeholder='Empresa' />
                                    <ErrorMessage name='company' component='div' className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Field type='text' name='phoneNumber' as={Form.Control} placeholder='Teléfono' />
                                    <ErrorMessage name='phoneNumber' component='div' className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Field type='email' name='email' as={Form.Control} placeholder='Email' />
                                    <ErrorMessage name='email' component='div' className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Field type='password' name='password' as={Form.Control} placeholder='Contraseña' />
                                    <ErrorMessage name='password' component='div' className="text-danger" />
                                </Form.Group>

                                <div className='buttonsModal mt-2'>
                                    <Button variant="secondary" onClick={handleAddModalClose}>
                                        Cerrar
                                    </Button>
                                    <Button variant="primary" type="submit" className='m-2' disabled={isSubmitting}>
                                        {isSubmitting ? 'Agregando...' : 'Agregar'}
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Form>
                    )}
                </Formik>
            </Modal>


            <Modal show={showBestClientModal} onHide={getBestClientModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mejores Clientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup as='ol' numbered>
                        {topBestClients.map((client) => (
                            <ListGroup.Item key={client.id} as='li' className='d-flex justify-content-between align-items-start'>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{client.name} {client.lastName}</div>
                                    <div><strong>Empresa:</strong> {client.company}</div>
                                    <div><strong>Teléfono:</strong> {client.phoneNumber}</div>
                                    <div><strong>Email:</strong> {client.email}</div>
                                </div>
                                <p>Cantidad comprada: {client.totalSpent}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={getBestClientModalClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};

export default AdmClient;
