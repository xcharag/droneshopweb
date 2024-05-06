import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');
    const history = useNavigate();

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
        if (!email || !password || !validateEmail(email)) {
            setEmailError(email ? 'El formato del email no es válido' : 'El campo de email es obligatorio');
            setPasswordError(password ? '' : 'El campo de contraseña es obligatorio');
            return;
        }

        try {
            // Realizar la autenticación
            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                  mutation Mutation($input: sellerAuthentication) {
                      authSellerLogin(input: $input) {
                        token
                      }
                    }
                    `,
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })
            });

            const responseData = await response.json();
            if (responseData.errors) {
                setAuthError('Usuario o contraseña incorrectos');
                return;
            }

            const token = responseData.data.authSellerLogin.token;

            // Obtener información del usuario
            const userResponse = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                query GetSeller($token: String) {
                  getSeller(token: $token) {
                    id
                    name
                    lastName
                    email
                    created
                  }
                    }
                    `,
                    variables: {
                        token
                    }
                })
            });

            const userData = await userResponse.json();
            if (userData.errors) {
                setAuthError('Error al obtener la información del usuario');
                return;
            }
            console.log('Información del usuario:', userData.data.getSeller);


            localStorage.setItem('seller', JSON.stringify(userData.data.getSeller));

            // Redireccionar a la página deseada
            history('/');
        } catch (error) {
            console.error(error);
            setAuthError('Error al iniciar sesión');
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="login d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className='p-5 bg-light rounded'>
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

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

