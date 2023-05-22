import { useState } from "react";
import PropTypes from "prop-types";

import {
  Badge,
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

import { useLocation } from "react-router-dom";

import { BsCart } from "react-icons/bs";

const NavigationBar = ({ searchTerm, setSearchTerm, itemCount }) => {
  let location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchVal, setSearchVal] = useState();

  return (
    <>
      <Navbar bg="light" expand="md" className="py-3 shadow-md">
        <Container>
          <Navbar.Brand href="/" className="fw-bold ">
            Yogical
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={handleShow}
            aria-controls={`offcanvasNavbar-expand-md`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Explore
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className=" justify-content-end flex-grow-1 pe-3">
                {location.pathname === "/" && (
                  <Nav.Item>
                    <InputGroup>
                      <Form.Control
                        className="py-2 px-4 my-0 rounded-start "
                        placeholder="Search your product"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={searchTerm}
                        onChange={(e) => setSearchVal(e.target.value)}
                      />
                      <Button
                        variant="secondary"
                        id="button-addon2"
                        className="py-2 px-4 my-0 rounded-end-5"
                        onClick={() => {
                          setSearchTerm(searchVal);
                          handleClose();
                        }}
                      >
                        Search
                      </Button>
                    </InputGroup>
                  </Nav.Item>
                )}
                <br />
                <Nav.Link
                  variant="secondary "
                  className="d-flex align-items-center bg-light rounded-5 py-2 px-3 "
                >
                  <BsCart size={20} />
                  &nbsp;
                  <Badge bg="warning">{itemCount}</Badge>
                </Nav.Link>
                <br />
                <Nav.Link
                  variant="secondary"
                  className="px-3 py-2 bg-light rounded-5"
                >
                  Account
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <hr className="m-0 border border-light border-1 opacity-100" />
    </>
  );
};

NavigationBar.propTypes = {
  searchTerm: PropTypes.func,
  setSearchTerm: PropTypes.func,
  itemCount: PropTypes.number,
};

export default NavigationBar;
