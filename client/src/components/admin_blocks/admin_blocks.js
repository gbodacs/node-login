import React from 'react';
import './admin_blocks.scss';
import Card from 'react-bootstrap/Card';

class AdminBlocks extends React.Component {
  render() {
    return (
      <div className="AdminBlocks">
        <Card style={{
            width: '30%'
          }} className={`mx-auto position-relative p-4 bg-light text-center`}>
          <Card.Body className="card-body">
            Admin Blocks
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminBlocks;
