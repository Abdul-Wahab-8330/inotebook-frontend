import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../context/notes/AlertContext';

const NavBar = () => {
  const showAlert = useAlert();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert("Logged Out Successfully", "success");
    navigate('/signin');
  };


  return (
    <Navbar style={{ borderBottom: "solid 1px gray" }} expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#E4E4E7" }}>iNoteBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          {!localStorage.getItem('token') ?
            <div className="d-flex">
              <Link to="/signup"><Button variant="primary" className="me-2" style={{ backgroundColor: "#27272A", color: "#E4E4E7", border: "gray solid 1px" }}>Sign Up</Button></Link>
              <Link to="/signin"><Button variant="primary" style={{ backgroundColor: "#27272A", color: "#E4E4E7", border: "gray solid 1px" }}>Sign In</Button></Link>
            </div>
            :
            <Button 
      onClick={handleLogout} 
      variant="primary" 
      style={{ backgroundColor: "#27272A", color: "#E4E4E7", border: "gray solid 1px" }}
    >
      Logout
    </Button>

          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
