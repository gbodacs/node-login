import React from 'react';
import './admin_getusers.scss';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
class AdminGetUsers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            accounts: []
        }
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentDidMount()
    {
        const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/user_print`);

        fetch(request).then(response =>
        {
            const status = response.status;
            if (status === 200)
            {
                response.json().then(data =>
                {
                    this.setState(
                    {
                        accounts: data.accounts
                    })
                })
            }
            else
            {
                response.json().then(serverError =>
                {
                    alert(response.status + '\n' + serverError.message);
                });
            }
        });
    }

    deleteAccount(event)
    {
        const idOfAccount = event.target.name.split(':')[0];
        const indexOfAccount = event.target.name.split(':')[1];

        const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/user_delete/${idOfAccount}`,
        {
            method: 'DELETE'
        })

        fetch(request)
            .then(response =>
            {
                const status = response.status;
                if (status === 204)
                {
                    let array = [...this.state.accounts];
                    array.splice(indexOfAccount, 1);
                    this.setState(
                    {
                        accounts: array
                    });
                }
                else
                {
                    response.json()
                        .then(serverError =>
                        {
                            alert(response.status + '\n' + serverError.message);
                        });
                }
            });
    }

    openNewWindow(event)
    {
        const idOfAccount = event.target.name.split(':')[0];
        const nameOfUser = event.target.name.split(':')[1];

        let windowObjectReference;

        function openRequestedPopup()
        {
            windowObjectReference = window.open(`${window.location.origin}/home/user_dailyplan`, "CNN_WindowName", "location=yes,resizable=yes,scrollbars=yes,status=yes");
            windowObjectReference.sessionStorage.setItem('userId', idOfAccount);
            windowObjectReference.sessionStorage.setItem('userName', nameOfUser);
            windowObjectReference.sessionStorage.setItem('isAdmin', false);
        }

        openRequestedPopup();
    }

  render() {
    const tableRow = this.state.accounts.map((account, index) =>
      <tr key={index + 1}>
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle">{account.name}</td>
        <td className="align-middle">{account.user}</td>
        <td className="align-middle">{account.email}</td>
        <td className="align-middle">{account.country}</td>
        <td className="align-middle">{account.isAdmin ? 'Admin' : 'User'}</td>
        <td className="align-middle">
          <Button variant="outline-danger" name={`${account._id}:${index}`} type="button" size="sm" onClick={this.deleteAccount}>
            Törlés
          </Button>
        </td>
        <td className="align-middle">
          <Button variant="outline-info" name={`${account._id}:${account.name}`} type="button" size="sm" onClick={this.openNewWindow}>
            Bejelentkezés
          </Button>
        </td>
      </tr>
    );
    return (
      <div className="AdminGetUsers my-5 mx-auto">
        <Card className={`p-4 bg-white`}>
          <Card.Body className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Név</th>
                  <th>Felhasználónév</th>
                  <th>Email</th>
                  <th>Ország</th>
                  <th>Jogosultság</th>
                  <th>Törlés</th>
                  <th>Bejelentkezés</th>
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

export default AdminGetUsers;
