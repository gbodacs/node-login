import React from 'react';
import './nopage.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class NoPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }

  redirectToHomePage() {
    this.props.history.push('/');
  }

  render() {
    return (<div className="NoPage">
      <Card style={{
          width: '30%'
        }} className={`mx-auto position-relative p-4 bg-light text-center`}>
        <Card.Body className="card-body">
          <h1>404</h1>
          <h4>Nincs ilyen oldal</h4>
          <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`mt-4`}>Vissza a főoldalra</Button>
        </Card.Body>
      </Card>
    </div>);
  }
}

export default NoPage;
