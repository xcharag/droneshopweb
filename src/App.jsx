import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Login from "./components/login/login.jsx";
import {Container} from "react-bootstrap";

function App() {

  return (
      <Container fluid>
          <Header/>
          <Login/>
          <Footer/>
      </Container>
  )
}

export default App
