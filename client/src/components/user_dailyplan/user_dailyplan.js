import React from 'react';
import './user_dailyplan.scss';
import Card from 'react-bootstrap/Card';

class UserDailyplan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };

  };

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return (<div className="UserDailyplan my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-white text-left">
        <Card.Body className="card-body">
          <h3>Napi gyakorlataim</h3>
          <p>{this.state.date.toLocaleDateString("hu-HU", options)}</p>
          <hr/>
        </Card.Body>
      </Card>
    </div>);
  }
}

export default UserDailyplan;
