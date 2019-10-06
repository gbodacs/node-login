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
      name: '',
      url: '',
      unit: '',
      comment: ''
    }
    this.exerciseFormChange = this.exerciseFormChange.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  exerciseFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (<div className="AdminExercises my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-light text-left">
        <Card.Body className="card-body">
          <h3>Feladatsor felvétele</h3>
          <h6>Itt tudsz új gyakorlatot felvenni:</h6>
          <hr/>
          <Form ref={(form) => {
              this.exerciseForm = form;
            }} onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="name">
              <Form.Label column="column" sm="2">Név</Form.Label>
              <Col sm="10">
                <Form.Control ref={(exercise) => {
                    this.nameInput = exercise;
                  }} name="name" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="url">
              <Form.Label column="column" sm="2">Youtube URL</Form.Label>
              <Col sm="10">
                <Form.Control name="url" type="text" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <hr/>
            <Form.Group as={Row} controlId="unit">
              <Form.Label column="column" sm="2">Mértékegység</Form.Label>
              <Col sm="10">
                <Form.Control name="unit" type="teyt" onChange={this.exerciseFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="comment">
              <Form.Label column="column" sm="2">Megjegyzés</Form.Label>
              <Col sm="10">
                <Form.Control name="comment" type="text" onChange={this.exerciseFormChange}/>
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
