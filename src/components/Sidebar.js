import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function Sidebar() {


  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-white">
        <Container fluid>
          <Button variant="outline-primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faBars} />
          </Button>
          <div className="nav-image">
            <img alt='Logo' src='/assets/images/LogoNav.jpg' style={{width:"50px",height:"50px",}} class="rounded-circle" />
          </div>
          

          <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title><strong>Skin Saviour</strong></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link href="/" className="my-2">Home</Nav.Link>
                <Nav.Link href="/product" className="my-2">Product</Nav.Link>
                <Nav.Link href="/cart" className="my-2">Cart</Nav.Link>
                <Nav.Link href="/category" className="my-2">Category</Nav.Link>
                <Nav.Link href="/about" className="my-2">About</Nav.Link>
                <Nav.Link href="/contact" className="my-2">Contact</Nav.Link>
              </Nav>

             
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      
    </>
  );
}

export default Sidebar;
