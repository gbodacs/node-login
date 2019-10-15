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
    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/logout`);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          cookies.remove('login', {path: '/'});
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
          <LinkContainer to="/home/user_dailyplan">
            <Nav.Link>Napi gyakorlatok</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/home/user-history">
            <Nav.Link>Előzmények</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/home/video_viewer">
            <Nav.Link>Demo</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    }
    return (
      <div className="Header">
        <Navbar bg="dark" variant="dark" expand="lg">
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
