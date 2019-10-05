import React from 'react';
import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isAdmin = this.props.isAdmin;
    let header;

    if (isAdmin) {
      header = (
        <Nav className="mr-auto">
          <NavDropdown title="Felhasználók" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Hozzáadás</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">Megtekintés</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#home">Napi tervek</Nav.Link>
          <Nav.Link href="#link">Gyakorlatok</Nav.Link>
          <Nav.Link href="#link">Blokkok</Nav.Link>
        </Nav>
      );
    } else {
      header = (
        <Nav className="mr-auto">
          <Nav.Link href="#link">Beállítások</Nav.Link>
          <Nav.Link href="#home">Napi tervek</Nav.Link>
          <Nav.Link href="#link">Történelem</Nav.Link>
        </Nav>
      );
    }
    return (
      <div className="Header">
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {header}
            <Nav.Link href="#link">Kilépés</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
