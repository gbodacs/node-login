import React from 'react';
import './login.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkbox: false
    };
    this.loginFormChange = this.loginFormChange.bind(this);
    this.checkBoxChange = this.checkBoxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.userInput.focus();
  }

  loginFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  checkBoxChange(event) {
    this.setState({
      checkbox: this.checkBoxInput.checked
    });
  }

  async handleSubmit(event) {
    event.preventDefault()

    const loginData = {
      'user': this.state.username,
      'pass': this.state.password,
      'remember-me': this.state.checkbox
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(loginData)
    }

    const request = new Request('http://localhost:3001/login', options);

    const response = await fetch(request);
    const status = await response.status;

    if (status === 200) {
      this.props.history.push('/');
    }
    else {
      this.loginForm.reset();
      const object = await response.json();
      alert(response.status + '\n' + object.message);
    }

  }

  render() {
    return (
      <div className="Login">
        <Card style={{ width: '50%' }} className={`mx-auto position-relative p-4 bg-light`}>
          <Card.Body className="card-body">
            <h3>Üdv újra itt!</h3>
            <h6>Kérlek, lépj be ha már van fiókod!</h6>
            <Form ref={(form) => { this.loginForm = form; }} onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Felhasználó</Form.Label>
                <Form.Control ref={(input) => { this.userInput = input; }} name="username" type="text" onChange={this.loginFormChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control name="password" type="password" onChange={this.loginFormChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check ref={(check) => { this.checkBoxInput = check; }} name="checkbox" type="checkbox" label="Emlékezz rám" onChange={this.checkBoxChange}/>
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
}


export default Login;
