import React from 'react';
import './connection.scss'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/footer';

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }

  redirectToHomePage() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <div className="Login">
          <Card style={{width: '60%'}} 
                className={`mx-auto position-relative p-4 bg-light`}>
            <Card.Body 
              variant="primary"
              className="Connec card-body">
                <h3>Kapcsolat</h3>
                <h6>Elérhetőségeink</h6>
                <hr/>
                <h6>{"Telefonszám:\n"}</h6>
                plusz36-húsz-24-89-860
                <hr/>
                <h6>{"Email cím:\n"}</h6>
                testtartasterapia-kukac-gmail-pont-com
                <hr/>
                <h6>{"Általános céginformációk:\n"}</h6>
                Nyilvántartási szám: 54050291
                <hr/>
                <h6>{"Cím:\n"}</h6>
                1048 Budapest Bőröndös utca 12.
                <hr/>
                <h6>{"Közösségi média linkek:\n"}</h6>
                <hr/>
                <h6>Weboldalt készítette: TEAM</h6>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`mt-4 mb-4 ml-4`}>Vissza a főoldalra</Button>
            </Card.Footer>
          </Card>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Connection;