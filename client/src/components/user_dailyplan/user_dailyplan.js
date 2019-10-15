import React from 'react';
import './user_dailyplan.scss';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

class UserDailyplan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showModal: false,
      playerVars: {
        autoplay: 1
      }
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

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
          <button className="youtubeButton" onClick={this.handleOpenModal}>
            <i class="fab fa-youtube"></i>
          </button>
          <Modal isOpen={this.state.showModal} contentLabel="OPEN">
            <button className="youtubeClose rounded-circle" onClick={this.handleCloseModal}>
              <i class="fas fa-times"></i>
            </button>
            <div className="d-flex justify-content-center">
              <YouTube videoId="2g811Eo7K8U" onReady={this._onReady}/>
            </div>
          </Modal>
        </Card.Body>
      </Card>
    </div>);
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

export default UserDailyplan;
