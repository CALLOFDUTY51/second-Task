import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.scss"



const NavbarComponent = () => {
  

  return (
    <>
    
    <Navbar bg="light" expand="lg">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand href="#"><img style={{width:"80px"}} src="https://rb.gy/1nyltu" alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
  <Nav.Link href="#" className="nav-link-mid">HOME</Nav.Link>
  <div className="nav-link-mid dropdown-container">
    <Nav.Link href="#" className="nav-link-mid">SHOP</Nav.Link>
              
            </div>
  
</Nav>

        <Nav className="ms-auto d-flex align-items-center">
  <Nav.Link href="#" className="nav__logo" >
    <span><i class="ri-shield-user-line"></i></span>
    
  </Nav.Link>
  <Nav.Link href="#" className="nav__logo" >
    <span><i class="fa-solid fa-magnifying-glass"></i></span>
  </Nav.Link>
  <Nav.Link href="#" className="nav__logo">
  <div className="icon-badge-container">
   <Link style={{textDecoration:"none"}} to='/Cart'> <span><i className="ri-shopping-bag-2-line"></i></span></Link>
    <span className="badge">3</span>
  </div>
</Nav.Link>

</Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
     
  </>
  
  );
};

export default NavbarComponent;
