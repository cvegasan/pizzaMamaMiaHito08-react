import React from 'react';
import pizzaImage from '../assets/img/notFound.png';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NotFound = () => {
  //useNavigate: hook useNavigate de react-router-dom para redirigir a Home al hacer click.
  //Navigate: no proporciona una función de redirección activada por un evento como un clic
  //redirige al usuario a otra ruta, solamente cuando se renderiza
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/pizzaMamaMiaHito08-react");
  };

  return (
    <div className="cls-container">
      <img src={pizzaImage} alt="Pizza" className="cls-tamannio-img-notfound" />
      <Button variant="primary" onClick={handleClick}>
        Volver a Home
      </Button>
    </div>
  );
};

export default NotFound;

