import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../action/userAction';

function Header() {
  const user = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = user;

  const logoutHandler = () => {
    dispatch(userLogout())
  }
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
              {userInfo ? <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown> : <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user">Login</i></Nav.Link>
                </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  )
}

export default Header
