import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { ADD_SELLER} from './gql/queries.js';
import { Button } from "react-bootstrap";
import '../login/login.css';
import Header from "../header/header.jsx";

const SignUp = () => {
    const [name] = useState('');
    const [lastname ] = useState('');
    const [email] = useState('');
    const [password] = useState('');
    const [emailError, setEmailError] = useState('');
    const [authError, setAuthError] = useState('');
    const [successAddSeller, setSuccessAddSeller] = useState(false);
    const [sellerToAdd, setSellerToAdd] = useState(null);
    const navigate = useNavigate();

    const [addSellerMutation] = useMutation(ADD_SELLER);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleAddSeller = async (e) => {
        e.preventDefault();

        if (!sellerToAdd.name || !sellerToAdd.lastname || !sellerToAdd.email || !sellerToAdd.password) {
            setAuthError('Todos los campos son obligatorios');
            return;
        } else {
            setAuthError('');
        }

        if (!validateEmail(sellerToAdd.email)) {
            setEmailError('El formato del email no es válido');
            return;
        }

        try {
            const { data } = await addSellerMutation({
                variables: {
                    input: {
                        name: sellerToAdd.name,
                        lastName: sellerToAdd.lastname,
                        email: sellerToAdd.email,
                        password: sellerToAdd.password
                    }
                }
            });

            if (data.newSeller) {
                setSuccessAddSeller(true);
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }
        } catch (error) {

            setAuthError('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
        }

    };


    return (
        <section className="login-banner">
        <div className="login d-flex justify-content-center align-items-center vh-100">
            <div className='p-5 bg-light rounded opacity-75'>
                <form id='form-sign-up' onSubmit={handleAddSeller}>
                    <h3 className="mb-4"> Registrarse </h3>
                    {authError && <div className="alert alert-danger">{authError}</div>}
                    {successAddSeller && <div className="alert alert-success mt-2">Usuario registrado con éxito</div>}
                    <div className="mb-3">
                        <label htmlFor="name"> Nombre </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Ingrese nombre"
                            value={sellerToAdd ? sellerToAdd.name : name}
                            onChange={(e) => setSellerToAdd({...sellerToAdd, name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname"> Apellido </label>
                        <input
                            type="text"
                            id="lastname"
                            className="form-control"
                            placeholder="Ingrese apellido"
                            value={sellerToAdd ? sellerToAdd.lastname : lastname}
                            onChange={(e) => setSellerToAdd({...sellerToAdd, lastname: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Ingrese email"
                            value={sellerToAdd ? sellerToAdd.email : email}
                            onChange={(e) => {
                                setSellerToAdd({...sellerToAdd, email: e.target.value});
                                setEmailError('');
                                setAuthError('');
                            }}
                        />
                        {emailError && <div className="alert alert-danger mt-2">{emailError}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"> Contraseña </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Ingrese contraseña"
                            value={sellerToAdd ? sellerToAdd.password : password}
                            onChange={(e) => setSellerToAdd({...sellerToAdd, password: e.target.value})}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="m-2" variant="outline-primary">Registrarse</Button>
                        <Link to='/login' className="btn btn-outline-secondary">Iniciar Sesión</Link>
                    </div>
                </form>
            </div>
        </div>
        </section>
    );
};

export default SignUp;
