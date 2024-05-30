import React, { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalHeader, ModalFooter, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { UPDATE_ORDER_STATUS } from "../gql/mutations.js";

const EditOrderStatusModal = ({ show, handleClose, orderData, reloadOrders }) => {
    const [editedOrder, setEditedOrder] = useState(orderData);
    const [updateOrderStatus, { loading, error }] = useMutation(UPDATE_ORDER_STATUS);

    useEffect(() => {
        setEditedOrder(orderData);
    }, [orderData]);

    const handleStatusChange = (e) => {
        setEditedOrder((prevOrder) => ({
            ...prevOrder,
            status: e.target.value
        }));
    };

    const handleEditOrderStatus = async () => {
        if (!editedOrder || !editedOrder.status || !editedOrder.id) {
            console.error('Order data is incomplete:', editedOrder);
            return;
        }
        try {
            console.log(editedOrder.id);
            //const seller = JSON.parse(localStorage.getItem('seller'));
            const { data } = await updateOrderStatus({
                variables: {
                    updateOrderStatusId: editedOrder.id,
                    input: {
                        status: editedOrder.status
                    },
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            console.log('Mutation result:', data);
            reloadOrders();
            handleClose();
        } catch (e) {
            console.error('Error in mutation:', e);
        }
    };

    if (!editedOrder) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <Modal.Title>Editar Estado de Orden</Modal.Title>
            </ModalHeader>
            <ModalBody>
                {error && <Alert variant="danger">Error al actualizar el estado: {error.message}</Alert>}
                <Form.Group controlId="formStatus">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select value={editedOrder.status} onChange={handleStatusChange}>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="COMPLETADO">COMPLETADO</option>
                        <option value="RECHAZADO">RECHAZADO</option>
                    </Form.Select>
                </Form.Group>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleEditOrderStatus} disabled={loading}>
                    {loading ? "Actualizando..." : "Guardar Cambios"}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

EditOrderStatusModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    orderData: PropTypes.object,
    reloadOrders: PropTypes.func.isRequired,
};

export default EditOrderStatusModal;
