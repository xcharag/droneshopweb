import React, { useState } from "react";
import { Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { NEW_PRODUCT } from "../gql/mutations.js";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";

const productSchema = yup.object().shape({
    name: yup.string().required("El nombre del producto es requerido"),
    stock: yup.number().integer().positive("La cantidad debe ser mayor a 0").required("La cantidad es requerida"),
    price: yup.number().integer().positive("El precio debe ser mayor a 0").required("El precio es requerido"),
    model: yup.string().required("El modelo es requerido"),
    specifications: yup.string().required("Las especificaciones son requeridas")
});

const AddProductModal = ({ show, handleClose, reloadProducts }) => {

    const [addProduct, { loading, error }] = useMutation(NEW_PRODUCT);

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Agregar Producto</ModalTitle>
            </ModalHeader>
            <Formik
                initialValues={{
                    name: '',
                    stock: 0,
                    price: 0,
                    model: '',
                    specifications: ''
                }}
                validationSchema={productSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        await addProduct({
                            variables: {
                                input: {
                                    name: values.name,
                                    stock: parseInt(values.stock),
                                    price: parseFloat(values.price),
                                    model: values.model,
                                    specifications: values.specifications
                                }
                            }
                        });
                        resetForm();
                        reloadProducts();
                        handleClose();
                    } catch {
                        console.error('Error adding product', error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <ModalBody>
                            <Form.Group controlId="formName">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Field type='text' name='name' as={Form.Control} placeholder='Nombre del Producto' />
                                <ErrorMessage name='name' component='div' className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formStock">
                                <Form.Label>Cantidad del Producto</Form.Label>
                                <Field type='number' name='stock' as={Form.Control} placeholder='Cantidad' min='1' />
                                <ErrorMessage name="stock" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formPrice">
                                <Form.Label>Precio del Producto</Form.Label>
                                <Field type='number' name='price' as={Form.Control} placeholder='Precio' min='1' />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                                <Form.Text>Precio en Bs.</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formModel">
                                <Form.Label>Modelo</Form.Label>
                                <Field type='text' name='model' as={Form.Control} placeholder='Modelo'></Field>
                                <ErrorMessage name="model" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formSpecifications" >
                                <Form.Label>Especificaciones</Form.Label>
                                <Field type='text' name='specifications' as={Form.Control} placeholder='Especificaciones'></Field>
                                <ErrorMessage name="specifications" component="div" className="text-danger" />
                            </Form.Group>
                        </ModalBody>

                        <Modal.Footer>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting || loading}>
                                    {isSubmitting || loading ? 'Agregando' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
}

export default AddProductModal;