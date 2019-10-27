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
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
  }

 componentDidMount () {
   this.data().then(data => {
     const self = this;
     this.setState({data: data});
   });
 }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  decreaseDate() {
    let yesterday = this.state.date.setDate(this.state.date.getDate() - 1);
    this.setState({date: new Date(yesterday)});
  }

  increaseDate() {
    let tomorrow = this.state.date.setDate(this.state.date.getDate() + 1);
    this.setState({date: new Date(tomorrow)});
  }

  handleSubmit(event) {
    event.preventDefault();

    const blockData = {
      name: this.state.userId,
      date: this.state.date,
      exerciseIdList: this.getExerciseIDs()
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(blockData)
    }

    const request = new Request(`${process.env.REACT_APP_BACKEND_SERVER}/user_dailyplan`, options);

    fetch(request)
      .then(response => {
        const status = response.status;
        if (status === 200) {
          this.blockForm.reset();
          this.deleteExerciseIDs();
          response.json()
            .then(data => {
              const blocks = this.state.blocks.concat(data.blocks);
            })
        } else {
          response.json()
            .then(serverError => {
              alert(response.status + '\n' + serverError.message);
            });
        }
      })
    }

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const date = this.state.date.toLocaleDateString("hu-HU", options);

    const blocks = this.props.blockData;
        console.log(blocks);
        const blockView = blocks.map((block) =>
          <ul key={blocks.id}>
            <div class="name">{blocks.block_name}</div>
            <div class="id">{blocks.block_id}</div>
            <div class="id">{blocks.dailyPlanComment}</div>
          </ul>
        );

    return (<div className="UserDailyplan my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-white text-left">
        <Card.Body className="card-body">
          <h3>Napi gyakorlataim</h3>
          <div className="d-flex flex-column">
            <buttongroup>
              <button class="font" onClick={this.decreaseDate}>&#8249;</button>
              <button>{date}</button>
              <button class="font" onClick={this.increaseDate}>&#8250;</button>
            </buttongroup>
          </div>
          <hr/>

          <div>
            <p>{blockView}</p>
          </div>

          <div>
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
          </div>

        </Card.Body>
      </Card>
    </div>);
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

export default UserDailyplan;
