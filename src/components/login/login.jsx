import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useMutation, gql, useLazyQuery} from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation AuthSellerLogin($email: String!, $password: String!) {
    authSellerLogin(input: { email: $email, password: $password }) {
      token
    }
  }
`;

const GET_SELLER_QUERY = gql`
  query GetSeller($token: String!) {
    getSeller(token: $token) {
      id
      name
      lastName
      email
      created
    }
  }
`;

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
        if (!email || !password || !validateEmail(email)) {
            setEmailError(email ? 'El formato del email no es válido' : 'El campo de email es obligatorio');
            setPasswordError(password ? '' : 'El campo de contraseña es obligatorio');
            return;
        }

        try {
            const { data } = await loginMutation({ variables: { email, password } });
            const token = data.authSellerLogin.token;

            const userData = await getSellerQuery({ variables: { token } });
            console.log('Información del usuario:', userData.data.getSeller);

            localStorage.setItem('seller', JSON.stringify(userData.data.getSeller));
            localStorage.setItem('token', token);

            // Redireccionar a la página deseada
            navigate('/');

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
        <div className="login d-flex justify-content-center align-items-center vh-100">
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
