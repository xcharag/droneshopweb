import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_CLIENT_QUERY, GET_SELLER_QUERY, LOGIN_CLIENT_MUTATION, LOGIN_MUTATION } from './gql/queries.js';
import { Button, Form } from "react-bootstrap";
import './login.css';
import Header from "../header/header.jsx";
import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';

const Login = () => {
    const navigate = useNavigate();

    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [getSellerQuery] = useLazyQuery(GET_SELLER_QUERY);
    const [getClientQuery] = useLazyQuery(GET_CLIENT_QUERY);
    const [clientLoginMutation] = useMutation(LOGIN_CLIENT_MUTATION);

    const validationSchema = yup.object().shape({
        email: yup.string().email('El formato del email es invalido').required('El campo email es requerido'),
        password: yup.string().required('El campo contraseña es requerido')
    });

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const { email, password } = values;
        try {
            const { data } = await loginMutation({ variables: { email, password } });
            const token = data.authSellerLogin.token;
            const userData = await getSellerQuery({ variables: { token } });

            localStorage.setItem('seller', JSON.stringify(userData.data.getSeller));
            localStorage.setItem('token', token);
            localStorage.setItem('client', JSON.stringify(false));

            navigate('/admClient');
            window.location.reload(); // Refresh context and re-render
        } catch (sellerError) {
            console.error(sellerError);
            if (sellerError.message === 'El vendedor no existe') {
                try {
                    // Attempt client login
                    const { data } = await clientLoginMutation({ variables: { input: { email, password } } });
                    const token = data.authClientLogin.token;
                    const userData = await getClientQuery({ variables: { token } });

                    localStorage.setItem('seller', JSON.stringify(false)); // Indicate that it's a client login
                    localStorage.setItem('client', JSON.stringify(userData.data.getClient));
                    localStorage.setItem('token', token);

                    navigate('/');
                    window.location.reload(); // Refresh context and re-render

                } catch (clientError) {
                    console.error(clientError);
                    if (clientError.message.includes('password')) {
                        setErrors({ auth: 'Email o contraseña incorrectos' });
                    } else {
                        setErrors({ auth: 'Error al iniciar sesión' });
                    }
                }
            } else if (sellerError.message.includes('password')) {
                setErrors({ auth: 'Email o contraseña incorrectos' });
            } else {
                setErrors({ auth: 'Error al iniciar sesión' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="login-banner">
            <Header />
            <div className="login d-flex justify-content-center align-items-center vh-100">
                <div className='p-5 bg-light rounded opacity-75'>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, isValid, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <h3 className="mb-4">Login</h3>
                                {errors.auth && <div className="alert alert-danger">{errors.auth}</div>}

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

                                <div className="mb-3 d-flex justify-content-end">
                                    <Button type="submit" className="m-2" variant="outline-primary" disabled={isSubmitting || !isValid}>
                                        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                    </Button>

                                    <Button className='m-2' variant="outline-primary" onClick={handleSignUpClick}>
                                        Registrarse como vendedor
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

export default Login;
