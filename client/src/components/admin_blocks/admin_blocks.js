import React from 'react';
import './admin_blocks.scss';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewExercise extends React.Component {
  render() {
    const listExercises = this.props.exercises.map(exercise =>
      <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
    )

    return (
      <Form.Group as={Row} controlId="blockExerciseItems">
        <Form.Label column="column" sm="2">Gyakorlat neve</Form.Label>
        <Col sm="10">
          <Form.Control name={`blockExerciseItem_${this.props.index}`} as="select" required onChange={this.props.onChangeValue}>
            {listExercises}
          </Form.Control>
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
      blockRepetition: '1',
      blockExerciseItem_0: '',
      blockExerciseList: [],
      exercises: [
        {
          '_id': "",
          'name': 'Válassz!',          
        }
      ]
    }
    this.blockFormChange = this.blockFormChange.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getExerciseIDs = this.getExerciseIDs.bind(this);
    this.deleteExerciseIDs = this.deleteExerciseIDs.bind(this);
  }

  componentDidMount() {
    this.blockNameInput.focus();

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/admin_block`, {credentials: 'include'});

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          response.json()
            .then(data => {
              const exercises = this.state.exercises.concat(data.exercises);
              this.setState({ exercises });
            })
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      });
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

  getExerciseIDs() {
    const stateItems = Object.keys(this.state);
    const exerciseItems = stateItems.filter(item => item.match('blockExerciseItem') !== null)
    let exerciseIDs = [];
    exerciseItems.map(item => {
      if (this.state[item] !== null)
        exerciseIDs.push(this.state[item])
    });
    return (exerciseIDs);
  }

  deleteExerciseIDs() {
    let actualState = Object.assign({}, this.state);
    const stateItems = Object.keys(this.state);
    const exerciseItems = stateItems.filter(item => item.match('blockExerciseItem') !== null)
    for (let i = 0; i < exerciseItems.length; i++) {
      actualState[exerciseItems[i]] = null
    }
    actualState.blockExerciseList = [];
    actualState.blockRepetition = '1';
    this.setState(actualState);
  }

  handleSubmit(event) {
    event.preventDefault();

    const blockData = {
      name: this.state.blockName,
      repeat: this.state.blockRepetition,
      exerciseIdList: this.getExerciseIDs()
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(blockData)
    }

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/admin_block`, options);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          this.blockForm.reset();
          this.deleteExerciseIDs();
          alert('Sikeresen felvettél egy blokkot!');
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      })
  }

  render() {
    const exercises = this.state.blockExerciseList.map((Element, index) => {
      return <Element key={ index + 1} index={index + 1} exercises={this.state.exercises} onChangeValue={this.blockFormChange}/>
    });

    const listExercises = this.state.exercises.map(exercise =>
      <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
    )

    return (<div className="AdminBlocks my-5 mx-auto">
      <Card className="p-4 bg-white text-left">
        <Card.Body className="card-body">
          <h3>Blokk felvétele</h3>
          <h6>Itt tudsz felvenni egy új blokk sablont</h6>
          <hr/>
          <Form ref={(form) => {
              this.blockForm = form;
            }} onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="blockName">
              <Form.Label column="column" sm="2">Blokk sablon neve</Form.Label>
              <Col sm="10">
                <Form.Control ref={(name) => {
                    this.blockNameInput = name;
                  }} name="blockName" type="text" required onChange={this.blockFormChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="blockRepetition">
              <Form.Label column="column" sm="2">Blokk sablon ismétlése</Form.Label>
              <Col sm="10">
                <Form.Control name="blockRepetition" as="select" required onChange={this.blockFormChange}>
                  <option value="">Válassz!</option>
                  <option value="n1x">Naponta egyszer</option>
                  <option value="n1xh3x">Naponta egyszer majd hetente háromszor</option>
                  <option value="h3x">Hetente háromszor</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="blockExerciseItems">
              <Form.Label column="column" sm="2">Gyakorlat neve {}</Form.Label>
              <Col sm="10">
                <Form.Control name="blockExerciseItem_0" as="select" required onChange={this.blockFormChange}>
                  {listExercises}
                </Form.Control>
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
