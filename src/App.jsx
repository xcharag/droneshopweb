import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header.jsx";
import Home from "./components/home/home.jsx";
import Footer from "./components/footer/footer.jsx";
import {Container} from "react-bootstrap";

function App() {

  return (
      <Container fluid>
          <Header/>
          <Home/>
          <Footer/>
      </Container>
  )
}

export default App
