import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { Button } from "react-bootstrap";

const Home = () => {
    const navigate = useNavigate(); // Obtener la historia de un objeto de navegación

    // Funcion para ejecutar luego de un click
    const handleClick = () => {
        // Redirect to /login route
        navigate("/login");
    };

    return (
        <div className="home">
            <Button variant="primary" onClick={handleClick}>Go to Login</Button>
        </div>
    );
}

export default Home;







