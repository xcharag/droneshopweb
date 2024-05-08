import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import AdmClient from './components/admClients/admClient.jsx';
import { createApolloClient } from './apolloClient';
import Staticsidebar from "./components/sidebar/staticsidebar.jsx";

const containerStyle = {
    padding: 0,
};


function App() {
    const apolloClient = createApolloClient(); // Create an instance of Apollo Client

    return (
        <ApolloProvider client={apolloClient} fluid>
            <Router>
                <Container fluid style={containerStyle}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/admClient" element={<AdmClientWithSidebar/>}/>
                    </Routes>
                </Container>
                <Footer/>
        </Router>
    </ApolloProvider>
    );
}
function AdmClientWithSidebar() {
    return (
        <div className="main-content" style={{ display: 'flex' }}>
            <Staticsidebar/> {/* Sidebar estático */}
            <div style={{ flex: 1, padding: '20px' }}>
                {/* Contenido específico de AdmClient */}
                <AdmClient/>
            </div>
        </div>
    );
}
export default App;
