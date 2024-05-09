import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_SELLER_QUERY, LOGIN_MUTATION } from './gql/queries.js';
import { Button } from "react-bootstrap";
import '../login/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [getSellerQuery] = useLazyQuery(GET_SELLER_QUERY);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setAuthError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setAuthError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos de email y contraseña
        if (!email || !password || !validateEmail(email)) {
            setEmailError(email ? 'El formato del email no es válido' : 'El campo de email es obligatorio');
            setPasswordError(password ? '' : 'El campo de contraseña es obligatorio');
            return;
        }

        try {
            const { data } = await loginMutation({ variables: { email, password } });
            const token = data.authSellerLogin.token;
            const userData = await getSellerQuery({ variables: { token } });

            localStorage.setItem('seller', JSON.stringify(userData.data.getSeller));
            localStorage.setItem('token', token);

            navigate('/admClient');

        } catch (error) {
            console.error(error);
            if (error.message === 'El vendedor no existe') {
                setAuthError('Usuario no registrado');
            } else if (error.message.includes('password')) {
                setAuthError('Email o contraseña incorrectos');
            } else {
                setAuthError('Error al iniciar sesión');
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <section className="login-banner">
        <div className="login d-flex justify-content-center align-items-center vh-100">
            <div className='p-5 bg-light rounded opacity-75'>
                <form id='form-login' onSubmit={handleSubmit}>
                    <h3 className="mb-4"> Login </h3>
                    {authError && <div className="alert alert-danger">{authError}</div>}
                    <div className="mb-3">
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <div className="alert alert-danger mt-2">{emailError}</div>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <div className="alert alert-danger mt-2">{passwordError}</div>}
                    </div>
                    <div className="mb-3">
                    <Button type="submit" className="m-2" variant="outline-primary">Iniciar Sesión </Button>
                    <Link to='/signUp' className="btn btn-outline-secondary">Registrarse como vendedor</Link>
                    </div>
                </form>
            </div>
        </div>
    </section>
    );
};

export default Login;
