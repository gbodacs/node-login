import React from 'react';
import './admin_dailyplan.scss';
import DatePicker from 'react-datepicker';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*class NewDailyPlan extends React.Component {
  render() {
    return ( <
      Form.Group as = {Row}
      controlId = "blockPack" >
      <Form.Label column = "column" sm = "2" > Blokk neve < /Form.Label>
      <Col sm = "10"><Form.Control name = {`block_${this.props.index}`}type = "text" / ></Col>
      <Form.Label column = "column" sm = "2" > Blokk ismétlésszáma < /Form.Label>
      <Col sm = "10"><Form.Control name = {`block_${this.props.index}`}type = "text" / ></Col>
      </Form.Group>
    );
  }
}*/

class AdminDailyPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          '_id': 0,
          'name': 'Válassz!'
        }
      ],
      blocks: [
        {
          '_id': 0,
          'name': 'Válassz!'
        }
      ],
      blockElementList: [],
      dailyPlanComment: '',
      userId: '',
      startDate: new Date(),
      endDate: new Date()
    }
    this.saveStartDate = this.saveStartDate.bind(this);
    this.saveEndDate = this.saveEndDate.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.dailyplanFormChange = this.dailyplanFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBlockIDs = this.deleteBlockIDs.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/admin_dailyplan`, {credentials: 'include'});

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          response.json()
            .then(data => {
              const users = this.state.users.concat(data.users);
              const blocks = this.state.blocks.concat(data.blocks);
              this.setState({ users, blocks });
            })
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      });
  }

  dailyplanFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addBlock() {
    const blocks = this.state.blockElementList.concat(NewBlock);
    this.setState({blockElementList: blocks});
  }

  saveStartDate(date) {
    this.setState({startDate: date});
  }

  saveEndDate(date) {
    this.setState({endDate: date});
  }

  resetForm() {
    this.dailyplanForm.reset();
    this.setState({startDate: new Date(), endDate: new Date()})
  }

  getBlockIDs() {
    const stateItems = Object.keys(this.state);
    const blockIdNames = stateItems.filter(item => item.match('block_name') !== null)
    const blockIdRepeats = stateItems.filter(item => item.match('block_repeat') !== null)
    let blockIds = [];
    blockIdNames.map(item => {
      if (this.state[item] !== null)
        blockIds.push(this.state[item])
    });
    let blockObjectList = [];
    blockIds.map((blockID, index) => {
      let block = {};
      block.id = blockID;
      if (blockIdRepeats[index]) {
        block.repeat = this.state[blockIdRepeats[index]];
      } else {
        block.repeat = null;
      }
      /*this.blockFormChange = this.blockFormChange.bind(this);
      this.addBlockPack = this.addBlockPack.bind(this);*/
    }

changeStartDate() {
  const [startDate, setStartDate] = startDate(new Date());
  return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  );
};

changeEndDate() {
  const [endDate, setEndDate] = endDate(new Date());
  return (
    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
  );
};

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(dailyplanData)
    }

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/admin_dailyplan`, options);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 201) {
          this.resetForm();
          this.deleteBlockIDs();
          alert('Sikeresen felvettél egy napi tervet!');
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      })
  }

  render() {
    const listUsers = this.state.users.map(user => {
      return <option key={user._id} value={user._id}>{user.name}</option>
    });

    const blocks = this.state.blockElementList.map((Element, index) => {
      return <Element key={ index + 1} index={index + 1} blocks={this.state.blocks} onChangeValue={this.dailyplanFormChange}/>
    });

    return (
      <div className="AdminDailyPlan my-5 mx-auto">
        <Card className="p-4 bg-white text-left">
          <Card.Body className="card-body">
            <h3>Napiterv felvétele</h3>
            <h6>Itt tudsz új időszakot felvenni:</h6>
            <hr/>
            <Form ref={(form) => {
                this.exerciseForm = form;
              }} onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="userName">
                <Form.Label column="column" sm="2">Felhasználó neve</Form.Label>
                <Col sm="10">
                  <Form.Control ref={(exercise) => {
                      this.nameInput = exercise;
                    }} name="userName" type="text" onChange={this.exerciseFormChange}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="startDate">
                <Form.Label column="column" sm="2">Kezdeti nap dátuma</Form.Label>
                <Col sm="10">
                  <DatePicker name="startDate" type="dateTime" onChange={this.changeStartDate}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="endDate">
                <Form.Label column="column" sm="2">Utolsó nap dátuma</Form.Label>
                <Col sm="10">
                  <DatePicker name="endDate" type="text" onChange={this.changeEndDate}/>
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
    export default AdminDailyPlan;
