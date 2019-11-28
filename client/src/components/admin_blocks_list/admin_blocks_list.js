import React from 'react';
import './admin_blocks_list.scss';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class AdminBlocksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
    this.deleteBlock = this.deleteBlock.bind(this);
  }

  componentDidMount() {
    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/block_print`);

      fetch(request)
        .then(response => {
          const status = response.status;
          if (status === 200) {
            response.json()
              .then(data => {
                console.log(data);
                this.setState({
                  blocks: data.blocks
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

    deleteBlock(event) {
      const idOfBlock = event.target.name.split(':')[0];
      const indexOfBlock = event.target.name.split(':')[1];

      const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/block_delete/${idOfBlock}`, {method: 'DELETE'})

      fetch(request)
        .then(response => {
          const status = response.status;
          if (status === 204) {
            let array = [...this.state.blocks];
            array.splice(idOfBlock, 1);
            this.setState({blocks: array});
          } else {
            response.json()
              .then(serverError => {
                alert(response.status + '\n' + serverError.message);
              });
          }
        });
    }

    render() {
      const tableRow = this.state.blocks.map((block, index) =>
        <tr key={index + 1}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">{block.name}</td>
          <td className="align-middle">{block.repeat}</td>
          <td className="align-middle">{block.exerciseList}</td>
          <td className="align-middle">{block.date}</td>
          <td className="align-middle">
            <Button variant="outline-danger" name={`${block._id}:${index}`} type="button" size="sm" onClick={this.deleteExercise}>
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
        <div className="AdminBlocksList my-5">

          <Card className={`p-4 bg-white`}>
            <Card.Body className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Név</th>
                    <th>Ismétlés*</th>
                    <th>Gyakorlatok</th>
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
        </div>
      );
    }
  }

  export default AdminBlocksList;
