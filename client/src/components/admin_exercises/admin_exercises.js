import React from 'react';
import './admin_exercises.scss';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdminExercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: '',
      exerciseUrl: '',
      exerciseUnit: '',
      exerciseComment: ''
    }
    this.exerciseFormChange = this.exerciseFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.exerciseNameInput.focus();
  }

  exerciseFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const exerciseData = {
      name: this.state.exerciseName,
      movielink: this.state.exerciseUrl,
      unit: this.state.exerciseUnit,
      comment: this.state.exerciseComment
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(exerciseData)
    }

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/admin_exercise`, options);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 201) {
          this.exerciseForm.reset();
          alert('Sikeresen felvettél egy gyakorlatot!');
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      });
  }

  render() {
    return (<div className="AdminExercises my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-white text-left">
        <Card.Body className="card-body">
          <h3>Gyakorlat felvétele</h3>
          <h6>Itt tudsz új gyakorlatot felvenni:</h6>
          <hr/>
          <Form ref={(form) => {
              this.exerciseForm = form;
            }} onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="exerciseName">
              <Form.Label column="column" sm="2">Név</Form.Label>
              <Col sm="10">
                <Form.Control ref={(exercise) => {
                    this.exerciseNameInput = exercise;
                  }} name="exerciseName" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exerciseUrl">
              <Form.Label column="column" sm="2">Youtube URL</Form.Label>
              <Col sm="10">
                <Form.Control name="exerciseUrl" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exerciseUnit">
              <Form.Label column="column" sm="2">Mértékegység</Form.Label>
              <Col sm="10">
                <Form.Control name="exerciseUnit" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exerciseComment">
              <Form.Label column="column" sm="2">Megjegyzés</Form.Label>
              <Col sm="10">
                <Form.Control name="exerciseComment" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <hr/>
            <div className="buttons d-flex justify-content-sm-end">
              <Button variant="outline-secondary" type="reset" value="Reset" className="mr-3">
                Törlés
              </Button>
              <Button variant="primary" type="submit" value="Submit">
                Hozzáadás
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>);
  }
}

export default AdminExercises;
