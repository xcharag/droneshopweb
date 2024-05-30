import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SELLER } from './gql/queries.js';
import { Button, Form } from "react-bootstrap";
import '../login/login.css';
import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
const SignUp = () => {
    const navigate = useNavigate();
    const [addSellerMutation] = useMutation(ADD_SELLER);

    const validationSchema = yup.object().shape({
        name: yup.string().required('El nombre es obligatorio'),
        lastName: yup.string().required('El apellido es obligatorio'),
        email: yup.string().email('El email no es válido').required('El email es obligatorio'),
        password: yup.string().required('La contraseña es obligatoria')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            console.log(values);
            const { data } = await addSellerMutation({
                variables: {
                    input: {
                        name: values.name,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password
                    }
                }
            });
            if (data.newSeller) {
                setStatus({ success: true });
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }
        } catch (error) {
            setStatus({ error: 'Ha ocurrido un error... Intentelo de nuevo' });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="login-banner">
            <div className="login d-flex justify-content-center align-items-center vh-100">
                <div className='p-5 bg-light rounded opacity-75'>
                    <Formik
                        initialValues={{
                            name: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, isSubmitting, status }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <h3 className="mb-4">Registrarse</h3>
                                {status && status.error && <div className="alert alert-danger">{status.error}</div>}
                                {status && status.success && <div className="alert alert-success mt-2">Usuario creado con éxito</div>}

                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Field type="text" name="name" as={Form.Control} placeholder="Nombre" />
                                    <ErrorMessage name="name" component="div" className="alert alert-danger mt-2" />
                                </Form.Group>

                                <Form.Group controlId="formlastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Field type="text" name="lastName" as={Form.Control} placeholder="Apellido" />
                                    <ErrorMessage name="lastName" component="div" className="alert alert-danger mt-2" />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Field type="email" name="email" as={Form.Control} placeholder="Email" />
                                    <ErrorMessage name="email" component="div" className="alert alert-danger mt-2" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Field type="password" name="password" as={Form.Control} placeholder="Contraseña" />
                                    <ErrorMessage name="password" component="div" className="alert alert-danger mt-2" />
                                </Form.Group>

                                <div className="d-flex justify-content-end">
                                    <Button type='submit' className='m-2' variant="outline-primary" disabled={isSubmitting}>
                                        Registrarse
                                    </Button>

                                    <Button className='m-2' variant='outline-primary' onClick={() => navigate('/login')}>
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
