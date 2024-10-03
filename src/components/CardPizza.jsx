import FormatoMiles from './FormatoMiles';
import iconPizza from '/icon-pizza.png'
import { Card, Button, ListGroup } from 'react-bootstrap';

import { CartContext } from "../context/CartContext";
import React, { useContext, useState} from "react";
import { useNavigate} from "react-router-dom";

const CardPizza = (props) => {
  const { addToCart } = useContext(CartContext);
  const createCart = (id, name, img, price) => {
    const newElementCart = {
      id,
      name,
      img,
      price,
      cantidad: 1,
    };

    addToCart(newElementCart);
    }
    
    const navigate=useNavigate();
    const verPizza=(id)=>{
      navigate(`/pizzaMamaMiaHito08-react/pizza/${id}`);
      console.log(id,'<--nevigate');
    }
  return (
    <Card className='cls-tamannio-cards'>
      <Card.Img variant="top" src={props.imagen} alt={props.nombre}/>
      <Card.Body className="p-0">
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <Card.Title className='text-start'>Pizza {props.nombre}</Card.Title>
                </ListGroup.Item>
                {
                props.esPizza &&(
                                <ListGroup.Item>
                                    <p className='cls-card-text-justify'>{props.desc}</p>
                                </ListGroup.Item>
                                )
              }
                <ListGroup.Item className='text-center'>
                    <p>Ingredientes:</p>
                    <p className='cls-tamannio-ingredientes'><img src={iconPizza} alt="iconoPizza"></img>{props.ingredientes}</p>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                    <strong>Precio: $<FormatoMiles numero = {props.precio} /></strong>
                    <div className="d-flex justify-content-between pt-1 pb-1">
                        <Button variant="outline-dark" size="sm" onClick={()=>verPizza(props.id)}>Ver Más 👀</Button>
                        <Button variant="dark" size="sm" onClick={() => createCart(props.id, props.nombre, props.imagen, props.precio)
                        }>Añadir 🛒</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;