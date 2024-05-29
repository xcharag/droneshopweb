import React, { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_STATUS } from "../gql/mutations.js";

// eslint-disable-next-line react/prop-types
const EditOrderStatusModal = ({ show, handleClose, orderData, reloadOrders }) => {
    const [editedOrder, setEditedOrder] = useState(null);
    const [updateOrderStatus, { loading, error }] = useMutation(UPDATE_ORDER_STATUS);

    useEffect(() => {
        setEditedOrder(orderData);
    }, [orderData]);

    if (!editedOrder || !show) {
        return null;
    }

    const handleStatusChange = (e) => {
        const { name, value } = e.target;
        setEditedOrder({ ...editedOrder, [name]: value });
    };

    const handleEditOrderStatus = async () => {
        try {
            await updateOrderStatus({
                variables: {
                    input: {
                        status: editedOrder.status
                    }
                }
            });
            setEditedOrder({
                status: ''
            });
            reloadOrders();
            handleClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton={true}>
                <Modal.Title>Editar Estado de Orden</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <Form.Group controlId='formStatus'>
                        <Form.Label>Estado</Form.Label>
                        <Form.Select value={editedOrder.status} onChange={handleStatusChange}>
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="COMPLETADO">Completado</option>
                            <option value="RECHAZADO">Rechazado</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </ModalBody>

            <Modal.Footer>
                <Button variant='primary' onClick={handleEditOrderStatus}>
                    {loading ? 'Agregando' : "Guardar Cambios"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditOrderStatusModal;