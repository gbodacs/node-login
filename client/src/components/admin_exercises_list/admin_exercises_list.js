import React from 'react';
import './admin_exercises_list.scss';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {formatDate} from '../../helpers/date-format';

class AdminExercisesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: []
    }
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/exercise_print`);

    fetch(request).then(response => {
      const status = response.status;
      if (status === 200) {
        response.json().then(data => {
          this.setState({exercise: data.exercise})
        })
      } else {
        response.json().then(serverError => {
          alert(response.status + '\n' + serverError.message);
        });
      }
    });
  }

  deleteExercise(event) {
    const idOfExercise = event.target.name.split(':')[0];
    const indexOfExercise = event.target.name.split(':')[1];

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/exercise_delete/${idOfExercise}`, {method: 'DELETE'})

    fetch(request).then(response => {
      const status = response.status;
      if (status === 204) {
        let array = [...this.state.exercise];
        array.splice(idOfExercise, 1);
        this.setState({exercise: array});
      } else {
        response.json().then(serverError => {
          alert(response.status + '\n' + serverError.message);
        });
      }
    });
  }

  render() {
    const tableRow = this.state.exercise.map((exercise, index) =>
    <tr key={index + 1}>
      <td className="align-middle">{index + 1}</td>
      <td className="align-middle">{exercise.name}</td>
      <td className="align-middle"><a href={exercise.movielink}>video</a></td>
      <td className="align-middle">{exercise.unit}</td>
      <td className="align-middle">{exercise.comment}</td>
      <td className="align-middle">{exercise.date}</td>
      <td className="align-middle">
        <Button variant="outline-danger" name={`${exercise._id}:${index}`} type="button" size="sm" onClick={this.deleteExercise}>
          Törlés
        </Button>
      </td>

      <td className="align-middle">
        <Button variant="outline-info" name="" type="button" size="sm" onClick="">
          Szerkesztés
        </Button>
      </td>

    </tr>);
    return (<div className="AdminExercisesList my-5 mx-auto">
      <Card className={`p-4 bg-white`}>
        <Card.Body className="card-body">
          <Table striped="striped" bordered="bordered" hover="hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Név</th>
                <th>Url</th>
                <th>Mértékegység</th>
                <th>Megjegyzés</th>
                <th>Felvétel dátuma</th>
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
    </div>);
  }
}

export default AdminExercisesList;
