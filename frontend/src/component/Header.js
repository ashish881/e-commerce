import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <div>
        <Container>
        <Navbar expand="lg">
        <LinkContainer to='/'>
        <Navbar.Brand>Amazon</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <Nav.Link href="#home" className="cart"><i className="fas fa-shopping-cart">Cart</i></Nav.Link>
        <Nav.Link href="#link"><i className="fas fa-user">Login</i></Nav.Link>
      </Nav> 
        </Navbar.Collapse>
      </Navbar>
      </Container>
        </div>
    )
}

export default Header
