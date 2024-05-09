import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import { createApolloClient } from './apolloClient';
import AdmClientWithSidebar from './components/sidebar/admClientSideBar.jsx';

const containerStyle = {
    padding: 0,
};


function App() {
    const apolloClient = createApolloClient(); // Create an instance of Apollo Client

    return (
        <ApolloProvider client={apolloClient} fluid>
            <Router>
                <Container fluid>
                    <Row>
                        <Col>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admClient" element={<AdmClientWithSidebar />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </Router>
    </ApolloProvider>
    );
}

export default App;
