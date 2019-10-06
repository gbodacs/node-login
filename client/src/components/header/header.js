import React from 'react';
import './header.scss';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    const request = new Request('http://localhost:3001/logout');

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          cookies.remove('login', {domain: 'localhost', path: '/'});
          this.props.history.push('/');
        }
      });
  }

  render() {
    const isAdmin = this.props.isAdmin;
    let header;

    if (isAdmin) {
      header = (
        <Nav className="mr-auto">
          <NavDropdown title="Felhasználók" id="basic-nav-dropdown">
            <LinkContainer to="/home/admin_adduser">
              <NavDropdown.Item>Hozzáadás</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/home/admin_getusers">
              <NavDropdown.Item>Megtekintés</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/home/admin_dailyplan">
            <Nav.Link>Napi tervek</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/home/admin_exercises">
            <Nav.Link>Gyakorlatok</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/home/admin_blocks">
            <Nav.Link>Blokkok</Nav.Link>
          </LinkContainer>
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
          <Navbar.Collapse id="basic-navbar-nav" className="mx-5">
            {header}
            <Nav.Link onClick={this.logoutUser} >Kilépés</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
