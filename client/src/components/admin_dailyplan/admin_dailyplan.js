import React from 'react';
import './admin_dailyplan.scss';
import Card from 'react-bootstrap/Card';

class AdminDailyPlan extends React.Component {
  render() {
    return (
      <div className="AdminDailyPlan">
        <Card style={{
            width: '30%'
          }} className={`mx-auto position-relative p-4 bg-light text-center`}>
          <Card.Body className="card-body">
            Admin DailyPlan
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminDailyPlan;
