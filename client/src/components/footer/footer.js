import React from 'react';
import './footer.scss';
import Card from 'react-bootstrap/Card';
import CardLink from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {
    return (<Card bg="white" className="footer fixed-bottom font-bold">
      <Card.Footer>
        <Card.Link>Copyright © 2019 | Az oldalt a TEAM működteti</Card.Link>
        <Card.Link>Kapcsolat</Card.Link>
        <Card.Link>Adatvédelmi elvek</Card.Link>
        <Card.Link>Süti szabályzat</Card.Link>
      </Card.Footer>
    </Card>);
  }
}

export default Footer;


/*import React from "react";
import './footer.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends React.Component {
  render() {
    return (
    <MDBFooter bg="white" className="footer font-bold pt-0 mt-0">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Kapcsolat</h5>
            <p>
              Ide írhatnánk majd Brigi elérhetőségeit
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Adatvédelmi elvek</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Süti szabályzat</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">FACEBOOK</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">YOUTUBE</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">BLOG</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className ="fixed-bottom">
          &copy; {new Date().getFullYear()} Copyright
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
}

export default Footer;*/
