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
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAdmin');

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/logout`);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          cookies.remove('login', {path: '/'});
          this.props.history.push('/login');
        }
      });
  }

  render() {
    const isAdmin = this.props.isAdmin;
    let header;

    if (isAdmin === 'true') {
      header = (
        <Nav className="mr-auto">
          <NavDropdown className="my-auto" title="Felhasználók" id="basic-nav-dropdown">
            <LinkContainer to="/home/admin_adduser">
              <NavDropdown.Item>Hozzáadás</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/home/admin_getusers">
              <NavDropdown.Item>Megtekintés</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown className="my-auto" title="Gyakorlatok" id="basic-nav-dropdown">
            <LinkContainer to="/home/admin_exercises">
              <NavDropdown.Item>Hozzáadás</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/home/admin_exercises_list">
              <NavDropdown.Item>Megtekintés</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown className="my-auto" title="Blokkok" id="basic-nav-dropdown">
            <LinkContainer to="/home/admin_blocks">
              <NavDropdown.Item>Hozzáadás</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/home/admin_blocks_list">
              <NavDropdown.Item>Megtekintés</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown className="my-auto" title="Napi tervek" id="basic-nav-dropdown">
            <LinkContainer to="/home/admin_dailyplan">
              <NavDropdown.Item>Hozzáadás</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/home/admin_dailyplan_list">
              <NavDropdown.Item>Megtekintés</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      );
    } else {
      header = (
        <Nav className="mr-auto">
          <img alt="" src="/image/logoW.png" width="120" height="50" className="d-inline-block align-top mr-3" />
          <LinkContainer to="/home/user_dailyplan">
            <Nav.Link className="my-auto">Napi gyakorlataim</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    }
    return (
      <div className="Header">
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="mx-5">
            {header}
            <Nav.Link className="logout" onClick={this.logoutUser} >Kilépés</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
