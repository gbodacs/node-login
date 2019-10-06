import React from 'react';
import './admin_blocks.scss';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewExercise extends React.Component {
  render() {
    return (
      <Form.Group as={Row} controlId="blockExerciseItems">
        <Form.Label column="column" sm="2">Gyakorlat neve</Form.Label>
        <Col sm="10">
          <Form.Control name={`blockExerciseItem_${this.props.index}`} type="text" onChange={this.props.onChangeValue}/>
        </Col>
      </Form.Group>
    );
  }
}

class AdminBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockName: '',
      blockRepetition: '',
      blockExerciseItem_0: '',
      blockExerciseList: [],
    }
    this.blockFormChange = this.blockFormChange.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.blockNameInput.focus();
  }

  blockFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addExercise() {
    const exercises = this.state.blockExerciseList.concat(NewExercise);
    this.setState({blockExerciseList: exercises});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    const exercises = this.state.blockExerciseList.map((Element, index) => {
      return <Element key={ index + 1} index={index + 1} onChangeValue={this.blockFormChange}/>
    });

    return (<div className="AdminBlocks my-5 mx-auto">
      <Card className="p-4 bg-light text-left">
        <Card.Body className="card-body">
          <h3>Blokk felvétele</h3>
          <h6>Vegyél fel egy új blokk sablont:</h6>
          <hr/>
          <Form ref={(form) => {
              this.blockForm = form;
            }} onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="blockName">
              <Form.Label column="column" sm="2">Blokk sablon neve</Form.Label>
              <Col sm="10">
                <Form.Control ref={(name) => {
                    this.blockNameInput = name;
                  }} name="blockName" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="blockRepetition">
              <Form.Label column="column" sm="2">Blokk sablon ismétlése</Form.Label>
              <Col sm="10">
                <Form.Control name="blockRepetition" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="blockExerciseItems">
              <Form.Label column="column" sm="2">Gyakorlat neve {}</Form.Label>
              <Col sm="10">
                <Form.Control name="blockExerciseItem_0" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            {exercises}
            <div className="d-flex justify-content-sm-center">
              <Button variant="info" className="align-center" type="button" onClick={this.addExercise}><i className="fas fa-plus-circle mr-2"></i>Gyakorlat hozzáadása</Button>
            </div>
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

export default AdminBlocks;
