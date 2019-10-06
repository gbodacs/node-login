import React from 'react';
import './admin_blocks.scss';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdminBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockName: '',
      blockRepetition: '',
      blockExerciseList: '[]',
      blockExerciseItems: ''

    }
    this.blockFormChange = this.blockFormChange.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  blockFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleBlockExerciseList(list) {
    let blockExerciseList = this.state.blockExerciseList;
    list.push(blockExerciseList);
    let name = list;
    this.setState({lists: blockExerciseList})
  }

  handleAddItem(item) {
     let blockExerciseItems = this.state;
      this.setState({
      items: blockExerciseItems
      })
  }

  render() {
    return (<div className="AdminBlocks my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-light text-left">
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
                <Form.Control ref={(exercise) => {
                    this.nameInput = exercise;
                  }} name="blockName" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="blockRepetition">
              <Form.Label column="column" sm="2">Blokk sablon ismétlése</Form.Label>
              <Col sm="10">
                <Form.Control name="blockRepetition" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <hr/>

            <Form.Group as={Row} controlId="blockExerciseItems">
              <Form.Label column="column" sm="2">Gyakorlat neve {}</Form.Label>
              <Col sm="10">
                <Form.Control name="blockExerciseItems" type="text" onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <hr/>
            <Form.Group as={Row} controlId="blockExerciseItems">
              <Form.Label column="column" sm="2">Gyakorlat neve {}</Form.Label>
              <Col sm="10">
                <Form.Control name="blockExerciseItems" type="text" onChange={this.blockFormChange}/>
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

export default AdminBlocks;
