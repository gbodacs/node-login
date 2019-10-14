import React from 'react';
import './user_history.scss';
import Card from 'react-bootstrap/Card';

class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    }


      render() {
        return (<div className="UserHistory my-5">
          <Card style={{
              width: '90%'
            }} className="mx-auto p-4 bg-white text-left">
            <Card.Body className="card-body">
              <h3>Előzmények</h3>
              <h6 name="today"></h6>
              <hr/>

            </Card.Body>
          </Card>
        </div>);
      }
    }


export default UserHistory;
