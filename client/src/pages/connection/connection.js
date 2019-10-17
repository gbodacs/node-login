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
          <Card style={{
              width: '50%'
            }} className={`mx-auto position-relative p-4 bg-light`}>
            <Card.Body className="card-body">
              <h3>Kapcsolat</h3>
              <hr/>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`mt-4`}>Vissza a főoldalra</Button>
            </Card.Footer>
          </Card>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Connection;