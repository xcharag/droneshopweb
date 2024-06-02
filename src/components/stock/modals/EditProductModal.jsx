// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../gql/mutations.js";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";

const productSchema = yup.object().shape({
    name: yup.string().required("El nombre del producto es requerido"),
    stock: yup.number().integer().positive("La cantidad debe ser mayor a 0").required("La cantidad es requerida"),
    price: yup.number().integer().positive("El precio debe ser mayor a 0").required("El precio es requerido"),
    model: yup.string().required("El modelo es requerido"),
    specifications: yup.string().required("Las especificaciones son requeridas")
});

// eslint-disable-next-line react/prop-types
const EditProductModal = ({ show, handleClose, productData, reloadProducts }) => {
    const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);


    if (!productData) {
        return null;
    }
    const handleEditProduct = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log(values);
            // eslint-disable-next-line react/prop-types
            console.log(productData.id);
            await updateProduct({
                variables: {
                    // eslint-disable-next-line react/prop-types
                    productUpdateId: productData.id,
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
        } catch (e) {
            console.error(e)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton={true}>
                <Modal.Title>Editar Producto</Modal.Title>
            </ModalHeader>

            <Formik
                initialValues={{
                    // eslint-disable-next-line react/prop-types
                    name: productData.name,
                    // eslint-disable-next-line react/prop-types
                    stock: productData.stock,
                    // eslint-disable-next-line react/prop-types
                    price: productData.price,
                    // eslint-disable-next-line react/prop-types
                    model: productData.model,
                    // eslint-disable-next-line react/prop-types
                    specifications: productData.specifications
                }}
                validationSchema={productSchema}
                onSubmit={handleEditProduct}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Field type="text" name="name" as={Form.Control} placeholder="Nombre del Producto" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formStock">
                                <Form.Label>Cantidad del Producto</Form.Label>
                                <Field type="number" name="stock" as={Form.Control} placeholder="Cantidad" min="1" />
                                <ErrorMessage name="stock" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formPrice">
                                <Form.Label>Precio del Producto</Form.Label>
                                <Field type="number" name="price" as={Form.Control} placeholder="Precio" min="1" />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                                <Form.Text>Precio en Bs.</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formModel">
                                <Form.Label>Modelo del Producto</Form.Label>
                                <Field type="text" name="model" as={Form.Control} placeholder="Modelo" />
                                <ErrorMessage name="model" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formSpecifications">
                                <Form.Label>Especificaciones del Producto</Form.Label>
                                <Field type="textarea" name="specifications" as={Form.Control} placeholder="Especificaciones" />
                                <ErrorMessage name="specifications" component="div" className="text-danger" />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button type="submit" variant="primary" disabled={isSubmitting || loading}>
                                {isSubmitting || loading ? 'Guardando Cambios' : 'Guardar Cambios'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default EditProductModal;