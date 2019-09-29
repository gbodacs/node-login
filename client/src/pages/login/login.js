import React from 'react';
import './login.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Login() {
  return (
    <div className="Login">
      <Card style={{ width: '50%' }} className={`mx-auto position-relative p-4 bg-light`}>
        <Card.Body className="card-body">
          <h3>Üdv újra itt!</h3>
          <h6>Kérlek, lépj be ha már van fiókod!</h6>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Felhasználó</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Emlékezz rám" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Belépés
            </Button>
          </Form>
          <hr/>
          <a href="#">Elfelejtettem a jelszavam</a>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
