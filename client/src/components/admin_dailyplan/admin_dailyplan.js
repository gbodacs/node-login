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
        userName: '',
        startDate: '',
        endDate: '',
        dailyPlanComment: '',
        blockPack: []
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

    render() {
      return (<div className="AdminDailyPlan my-5 mx-auto">
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
