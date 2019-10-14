import React from 'react';
import './terms_cookies.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import CardLink from 'react-bootstrap/Card';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }

  redirectToHomePage() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <Card className="Terms p-2 mx-auto my-5">
        <Card.Body>
          <Card.Title>Adatvédelmi és Adatkezelési szabályzat</Card.Title>
          <Card.Text>
            Ide fog jönni a hosszú szöveg.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`mt-4`}>Vissza a főoldalra</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default Terms;
