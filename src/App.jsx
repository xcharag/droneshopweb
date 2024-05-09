import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import SignUp from './components/sign-up/signUp.jsx';
import AdmClient from './components/admClients/admClient.jsx';
import Cart from "./components/cart/cart.jsx";
import Products from "./components/products/products.jsx";

import { createApolloClient } from './apolloClient';

const containerStyle = {
    paddingTop: '70px',
    height: '100vh',
    backgroundColor: '#242424'
};


function App() {
    const apolloClient = createApolloClient(); // Create an instance of Apollo Client

    return (
        <ApolloProvider client={apolloClient} fluid>
            <Router>
                <Header />
                <Container fluid style={containerStyle}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admClient" element={<AdmClient />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/signUp" element={<SignUp/>}/>
                    </Routes>
                </Container>
                <Footer />
            </Router>
        </ApolloProvider>
    );
}

export default App;
