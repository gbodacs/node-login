import React from 'react';
import './admin_getusers.scss';
import Card from 'react-bootstrap/Card';

class AdminGetUsers extends React.Component {
  render() {
    return (
      <div className="AdminGetUsers">
        <Card style={{
            width: '30%'
          }} className={`mx-auto position-relative p-4 bg-light text-center`}>
          <Card.Body className="card-body">
            Admin Get Users
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminGetUsers;
