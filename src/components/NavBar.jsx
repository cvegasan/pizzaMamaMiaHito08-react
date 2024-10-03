import iconPizza from '/icon-pizza.png'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// recordar condición ? true : false
import FormatoMiles from './FormatoMiles';

import {Link} from 'react-router-dom';

import { useContext} from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    // const total = 25000;
    //INI comentado, ahora viene con valor true desde el AuthContext
    // const token = false;
    const { token,logout } = useContext(AuthContext);
    //FIN comentado, ahora viene con valor true desde el AuthContext
    const {
        amount
      } = useContext(CartContext)

  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand>Pizzeria Mamma Mia!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        {!token &&
                            <Nav.Item className="cls-item-spacing">
                                <Link to="/pizzaMamaMiaHito08-react">
                                    <Button variant="outline-light" size="sm"><img src={iconPizza} alt="iconoPizza"></img> Home </Button>
                                </Link>
                            </Nav.Item>
                        }
                        {!token &&
                            <Nav.Item className="cls-item-spacing">
                                <Link to="/pizzaMamaMiaHito08-react/login">
                                    {/* <Button variant="outline-light" size="sm">{token ? '🔓Profile' : '🔐Login'}</Button> */}
                                    <Button variant="outline-light" size="sm">🔐Login</Button>
                                </Link>
                            </Nav.Item>
                        }
                        {!token &&
                        <Nav.Item className="cls-item-spacing">
                            <Link to="/pizzaMamaMiaHito08-react/register">
                                <Button variant="outline-light" size="sm">🔐Register</Button>
                            </Link>
                        </Nav.Item>
                        }

                        {token &&
                        <Nav.Item className="cls-item-spacing">
                            <Link to="/pizzaMamaMiaHito08-react">
                                <Button variant="outline-light" size="sm" onClick={logout}>🔒Logout</Button>
                            </Link>
                        </Nav.Item>
                        }
                        {token &&
                                (<Nav.Item>
                                    <Link to="/pizzaMamaMiaHito08-react/profile">
                                        <Button variant="outline-light" size="sm">😎Profile</Button>
                                    </Link>
                                </Nav.Item>)
                        }
                    </Nav>
                    {!token &&
                    <div className="d-flex">
                        <Link to="/pizzaMamaMiaHito08-react/cart">
                            <Button variant="outline-info" size="sm">🛒Total: $<FormatoMiles numero={amount} /></Button>
                        </Link>
                    </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar;
