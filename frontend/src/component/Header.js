import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <div className="navbar1">
      <Container>
        <Navbar expand="lg">
          <LinkContainer to='/'>
            <Navbar.Brand>Amazon</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link className="cart"><i className="fas fa-shopping-cart">Cart</i></Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user">Login</i></Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  )
}

export default Header
