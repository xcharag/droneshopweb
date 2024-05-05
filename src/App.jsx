import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header.jsx";
import Home from "./components/home/home.jsx";
import Footer from "./components/footer/footer.jsx";
import Login from "./components/login/login.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Header/>
        <Login/>
        <Footer/>
    </div>
  )
}

export default App
