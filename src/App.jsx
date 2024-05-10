import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/footer/footer.jsx';
import Header from './components/header/header.jsx'; // Import your header component here
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import SignUp from './components/sign-up/signUp.jsx';
import Cart from "./components/cart/cart.jsx";
import Products from "./components/products/products.jsx";
import AdmClientSidebar from "./components/sidebar/admClientSideBar.jsx";
import StockSidebar from "./components/sidebar/stockSideBar.jsx";

import { createApolloClient } from './apolloClient';

const containerStyle = {
    paddingTop: '70px',
    paddingBottom: '70px',
    height: '100vh',
    backgroundColor: '#242424'
};


const DefaultLayout = ({ children }) => (
    <>
        <Header /> {/* Include the header component */}
        <Container fluid style={containerStyle}>
            {children}
        </Container>
        <Footer />
    </>
);

function App() {
    const apolloClient = createApolloClient(); // Create an instance of Apollo Client

    return (
        <ApolloProvider client={apolloClient} fluid>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<DefaultLayout><Home /></DefaultLayout>}
                    />
                    <Route
                        path="/login"
                        element={<DefaultLayout><Login /></DefaultLayout>}
                    />
                    <Route
                        path="/cart"
                        element={<DefaultLayout><Cart /></DefaultLayout>}
                    />
                    <Route
                        path="/products"
                        element={<DefaultLayout><Products /></DefaultLayout>}
                    />
                    <Route
                        path="/signUp"
                        element={<DefaultLayout><SignUp/></DefaultLayout>}
                    />
                    <Route path="/admClient" element={<AdmClientSidebar />} />
                    <Route path="/stock" element={<StockSidebar />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
