import React from 'react';
import './footer.scss';
import Card from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {

    return (<Card bg="light">
      <Card.Header>
        <small>BRIGITTA GYÓGYTORNÁSZ</small>
      </Card.Header >
      <Card.Body>
        <blockquote className="blockquote mb-0">

          <Card.Body className={'d-flex justify-content-sm-around'}>
            <div>
              <small>CÍM: 1000 Budapest, Kossuth Lajos utca 1.</small>
              <br></br>
              <small>TELEFON: +36-00-000-0000</small>
              <br></br>
              <small>E-MAIL: brigitta@gmai.com</small>
            </div>
            <br></br>
            <div>
              <Card.Text>
                <small>Itt is követhetsz:</small>
              </Card.Text>
              <i className="fab fa-facebook-square"></i>
              <Card.Link href="#"><small> FACEBOOK </small></Card.Link>
              <i className="fab fa-youtube"></i>
              <Card.Link href="#"><small> YOUTUBE </small></Card.Link>
              <i className="fab fa-blogger"></i>
              <Card.Link href="#"><small> BLOG </small></Card.Link>
            </div>
          </Card.Body>
        </blockquote>
      </Card.Body>
      <Card.Footer className="blockquote-footer">
        © 2019 Minden jog fenntartva | Az oldalt a TEAM működteti
      </Card.Footer>
    </Card>);
  }
}

export default Footer;
