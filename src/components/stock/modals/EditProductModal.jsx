import React, {useEffect, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {UPDATE_PRODUCT} from "../gql/mutations.js";

const EditProductModal = ({show, handleClose, productData, reloadProducts}) => {
    const [editedProduct, setEditedProduct] = useState(null);
    const [updateProduct, {loading, error}] = useMutation(UPDATE_PRODUCT);

    useEffect(() => {
        setEditedProduct(productData)
    }, [productData]);

    if (!editedProduct) {
        return null;
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedProduct({...editedProduct, [name]: value});
    }

    const handleEditProduct = async () => {
        try {
            await updateProduct({
                variables: {
                    productUpdateId: editedProduct.id,
                    input: {
                        name: editedProduct.name,
                        stock: parseInt(editedProduct.stock),
                        price: parseFloat(editedProduct.price),
                        model: editedProduct.model,
                        specifications: editedProduct.specifications
                    }
                }
            });

            setEditedProduct({
                name: '',
                stock: 0,
                price: 0,
                model: '',
                specifications: ''
            });

            reloadProducts();
            handleClose();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton={true}>
                <Modal.Title>Editar Producto</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <Form.Group controlId='formName'>
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Producto'
                            name='name'
                            value={editedProduct.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formStock'>
                        <Form.Label>Cantidad del producto</Form.Label>
                        <Form.Control
                            type='number'
                            min='1'
                            name='stock'
                            value={editedProduct.stock}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formPrice'>
                        <Form.Label>Precio Unitario</Form.Label>
                        <Form.Control
                            placeholder='Precio'
                            name='price'
                            value={editedProduct.price}
                            onChange={handleInputChange}
                        />
                        <Form.Text>Precio en Bs.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formModel'>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type='text'
                                      placeholder='Modelo'
                                      name='model'
                                      value={editedProduct.model}
                                      onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formSpecifications'>
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type='text'
                                      placeholder='Especificaciones'
                                      name='specifications'
                                      value={editedProduct.specifications}
                                      onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </ModalBody>

            <Modal.Footer>
                <Button variant='primary' onClick={() => handleEditProduct()}>
                    {loading ? 'Agregando' : "Guardar Cambios"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProductModal;