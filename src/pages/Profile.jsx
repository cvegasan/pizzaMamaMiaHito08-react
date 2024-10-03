import React,{ useContext }  from 'react';
import { Container, Row, Col, Image, Button, ListGroup,Form } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import image from '../assets/img/cavs.jpg'
import { AuthContext } from '../context/AuthContext';

const Profile = () =>{
  const { token, logout, profileUser } = useContext(AuthContext);
  return (
    <div className="d-flex align-items-center justify-content-center cls-alineacion-form">
    <Container>
      <Row>
        {/* Columna Izquierda */}
        <Col md={4} className="text-center">
          {/* Foto Circular */}
          <Image
            src={image}
            roundedCircle
            alt="Foto de Perfil"
            width={150}
            height={150}
          />
          <h3>Cristian Vega</h3>
          <p>Edad: 46</p>
          <p>Ciudad: Santiago, Chile</p>
          <p>Email: {profileUser.email}</p>
          {/* Iconos de Redes Sociales */}
          <div>
            <FaFacebook size={30} className="mx-2" />
            <FaTwitter size={30} className="mx-2" />
            <FaInstagram size={30} className="mx-2" />
          </div>
          <Button variant="danger" className="mt-3">Cerrar sesión</Button>
        </Col>

        {/* Columna Derecha */}
        <Col md={8}>
        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" />
        </Form.Group>

          <h4>Últimas compras realizadas</h4>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Fecha:</strong> 20 de agosto de 2024
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fecha:</strong> 15 de agosto de 2024
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary" className="mt-3">Ver más</Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Profile;