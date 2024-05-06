import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Login from "./components/login/login.jsx";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/home/home.jsx';
import AdmClient from './components/admClients/admClient.jsx';

function App() {

    return (
        <Router>
            <Header />
            <Container fluid>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/admClient" element={<AdmClient/>} />
                </Routes>

            </Container>
            <Footer />
        </Router>
    )
}

export default App