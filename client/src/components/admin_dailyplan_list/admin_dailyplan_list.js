import React from 'react';
import './admin_dailyplan_list.scss';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class AdminDailyPlanList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyplan: []
    }
    this.deleteDailyPlan = this.deleteDailyPlan.bind(this);
  }

  componentDidMount() {
    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/dailyplan_print`);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          response.json()
            .then(data => {
              this.setState({
                dailyplan: data.dailyplan
              })
            })
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      });
    }

    deleteDailyPlan(event) {
    const idOfDailyplan = event.target.name.split(':')[0];
    const indexOfDailyplan = event.target.name.split(':')[1];

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/dailyplan_delete/${idOfDailyplan}`, {method: 'DELETE'})

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 204) {
          let array = [...this.state.dailyplan];
          array.splice(idOfDailyplan, 1);
          this.setState({dailyplan: array});
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      });
    }

    render() {
    const tableRow = this.state.dailyplan.map((dailyplan, index) =>
      <tr key={index + 1}>
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle">{dailyplan.userId}</td>
        <td className="align-middle">{dailyplan.movielink}</td>
        <td className="align-middle">{dailyplan.unit}</td>
        <td className="align-middle">{dailyplan.comment}</td>
        <td className="align-middle">{dailyplan.date}</td>
        <td className="align-middle">
          <Button variant="outline-danger" name={`${dailyplan._id}:${index}`} type="button" size="sm" onClick={this.deleteDailyPlan}>
            Törlés
          </Button>
        </td>
        <td className="align-middle">
          <Button variant="outline-info" name="" type="button" size="sm" onClick="">
            Szerkesztés
          </Button>
        </td>
      </tr>
    );
    return (
      <div className="AdminExercisesList my-5 mx-auto">
        <Card className={`p-4 bg-white`}>
          <Card.Body className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Név</th>
                  <th>Url</th>
                  <th>Mértékegység</th>
                  <th>Megjegyzés</th>
                  <th>Dátum</th>
                  <th>Törlés</th>
                  <th>Szerkesztés</th>
                </tr>
              </thead>
              <tbody>
                {tableRow}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
    }
    }

    export default AdminDailyPlanList;
