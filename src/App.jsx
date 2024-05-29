import React, { useEffect, useState } from 'react';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/footer/footer.jsx';
import Header from './components/header/header.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import SignUp from './components/sign-up/signUp.jsx';
import Cart from "./components/cart/cart.jsx";
import Products from "./components/products/products.jsx";
import AdmClientSidebar from "./components/sidebar/admClientSideBar.jsx";
import StockSidebar from "./components/sidebar/stockSideBar.jsx";

import { createApolloClient } from './apolloClient';
import { VALIDATE_TOKEN } from './query';

const containerStyle = {
    paddingTop: '70px',
    paddingBottom: '70px',
    height: '100vh',
    backgroundColor: '#242424'
};

const DefaultLayout = ({ children }) => (
    <>
        <Header />
        <Container fluid style={containerStyle}>
            {children}
        </Container>
        <Footer />
    </>
);

const PrivateRoute = ({ element, allowedRoles }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [userType, setUserType] = useState(null);
    const [validateToken] = useLazyQuery(VALIDATE_TOKEN);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const { data } = await validateToken({
                        context: {
                            headers: {
                                Authorization: token,
                            },
                        },
                    });
                    setIsAuthorized(data?.validateToken?.status || false);
                    setUserType(data?.validateToken?.type || 'NONE');
                } else {
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.error(err);
                setIsAuthorized(false);
            }
        };
        checkToken();
    }, [validateToken]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized && allowedRoles.includes(userType) ? element : <Navigate to="/" />;
};

function App() {
    const apolloClient = createApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
                    <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
                    <Route path="/cart" element={<PrivateRoute element={<DefaultLayout><Cart /></DefaultLayout>} allowedRoles={['SELLER', 'CLIENT']} />} />
                    <Route path="/products" element={<DefaultLayout><Products /></DefaultLayout>} />
                    <Route path="/signUp" element={<DefaultLayout><SignUp /></DefaultLayout>} />
                    <Route path="/admClient" element={<PrivateRoute element={<AdmClientSidebar />} allowedRoles={['SELLER']} />} />
                    <Route path="/stock" element={<PrivateRoute element={<StockSidebar />} allowedRoles={['SELLER']} />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
