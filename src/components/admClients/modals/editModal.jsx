import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
// En el modal de edición (EditClientModal)
const EditClientModal = ({ show, handleClose, clientData, handleEdit }) => {
    const [editedClient, setEditedClient] = useState(clientData);

    // Verificar si editedClient es null antes de renderizar el formulario
    if (!editedClient) {
        return null; // No renderizar nada si editedClient es null
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedClient({ ...editedClient, [name]: value });
    };

    const handleSubmit = () => {
        handleEdit(editedClient); // Llamar a la función para manejar la edición del cliente
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre" name="name" value={editedClient.name} onChange={handleChange} />
                    </Form.Group>
                    {/* Resto del formulario */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default EditClientModal;
