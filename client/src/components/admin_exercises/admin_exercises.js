import React from 'react';
import './admin_exercises.scss';
import Card from 'react-bootstrap/Card';

class AdminExercises extends React.Component {
  render() {
    return (
      <div className="AdminExercises">
        <Card style={{
            width: '30%'
          }} className={`mx-auto position-relative p-4 bg-light text-center`}>
          <Card.Body className="card-body">
            Admin Exercises
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminExercises;
