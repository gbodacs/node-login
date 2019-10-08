import React from 'react';
import './admin_adduser.scss';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdminAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      country: '',
      username: '',
      password: '',
      checkbox: false,
      countryList: []
    }
    this.registerFormChange = this.registerFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearRegisterForm = this.clearRegisterForm.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();

    const request = new Request('http://localhost:3001/signup', {credentials: 'include'});

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          response.json()
            .then(data => {
              this.setState({
                countryList: data.countryList
              })
            })
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
              this.props.history.push('/home');
            });

        }
      });
  }

  registerFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clearRegisterForm() {
    this.registerForm.reset();
  }

  handleSubmit(event) {
    event.preventDefault();

    const registerData = {
      name: this.state.name,
			email: this.state.email,
			user: this.state.username,
			pass: this.state.password,
			country: this.state.country,
      isAdmin: this.isAdminCheckBoxInput.checked
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(registerData)
    }

    const request = new Request('http://localhost:3001/signup', options);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 201) {
          this.registerForm.reset();
          alert('Sikeresen felvettél egy felhasználót!');
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      })
  }

  render() {
    const listCountries = this.state.countryList.map(country => 
      <option key={country.short}>{country.name}</option>
    );

    return (
      <div className="AdminAddUser my-5 mx-auto">
        <Card className="p-4 bg-white text-left">
          <Card.Body className="card-body">
            <h3>Fiók nyitása</h3>
            <h6>Kérlek, töltsd ki az adatokat</h6>
            <hr/>
            <Form ref={(form) => {
                this.registerForm = form;
              }} onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="name">
                <Form.Label column sm="2">Név</Form.Label>
                <Col sm="10">
                  <Form.Control ref={(name) => {
                      this.nameInput = name;
                    }} name="name" type="text" onChange={this.registerFormChange}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                  <Form.Control name="email" type="email" onChange={this.registerFormChange}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="selectCountry">
                <Form.Label column sm="2">Ország</Form.Label>
                <Col sm="10">
                  <Form.Control name="country" as="select" onChange={this.registerFormChange}>
                    {listCountries}
                  </Form.Control>
                </Col>
              </Form.Group>
              <hr/>
              <Form.Group as={Row} controlId="username">
                <Form.Label column sm="2">Felhasználó</Form.Label>
                <Col sm="10">
                  <Form.Control name="username" type="text" onChange={this.registerFormChange}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label column sm="2">Jelszó</Form.Label>
                <Col sm="10">
                  <Form.Control name="password" type="text" onChange={this.registerFormChange}/>
                </Col>
              </Form.Group>
              <hr/>
              <Row className="d-flex justify-content-sm-between">
                <Form.Group controlId="isAdminCheckBox" className="ml-3">
                  <Form.Check ref={(check) => {
                    this.isAdminCheckBoxInput = check;
                  }} name="checkbox" type="checkbox" label="Admin"/>
                </Form.Group>
                <div className="buttons mr-3">
                  <Button variant="outline-dark" type="button" className="mr-3" onClick={this.clearRegisterForm}>
                    Mégsem
                  </Button>
                  <Button variant="primary" type="submit">
                    Tovább
                  </Button>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminAddUser;
