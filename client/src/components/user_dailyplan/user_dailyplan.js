import React from 'react';
import './user_dailyplan.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

class BlockElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      i: 0
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentDidMount() {
    this.setState({
      videoIdList: this.props.videoIdList,
      videoId: this.props.videoIdList[this.state.i]
    });
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  onEnd() {
    this.setState({videoId: this.state.videoIdList[++this.state.i]});
    if (this.state.i === this.state.videoIdList.length) {
      this.handleCloseModal();
    }
  }

  render() {
    const exercises = this.props.exercises.map((exercise, index) => {
      return <ListGroup.Item key={index}>{exercise.name}</ListGroup.Item>
    });

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <Card>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Body>
          <ListGroup>
            {exercises}
          </ListGroup>
          <div>
            <button className="youtubeButton" onClick={this.handleOpenModal}>
              <i className="fab fa-youtube"></i>
            </button>
            <Modal isOpen={this.state.showModal} contentLabel="OPEN">
              <button className="youtubeClose rounded-circle" onClick={this.handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="d-flex justify-content-center">
                <YouTube videoId={this.state.videoId} opts={opts} onEnd={this.onEnd}/>
              </div>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

class UserDailyplan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      userId: '5d910929615fbd829df9a763',
      userName: 'Pisti',
      dailyPlanBlocks: [],
      dailyPlanComment: '',
      allBlocks: [],
      allExercises: []
    };
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
  }

 componentDidMount () {
   const blockData = {
     id: this.state.userId, //get.Localstorage.userId
     date: this.state.date
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
         response.json()
           .then(data => {
             this.setState({
               dailyPlanBlocks: data[0].blocks,
               dailyPlanComment: data[0].comment,
               allBlocks: data[0].allBlocks,
               allExercises: data[0].allExercises
             })
           })
       } else {
         response.json()
           .then(serverError => {
             alert(response.status + '\n' + serverError.message);
           });
       }
     })
     .catch(error => {
       console.error(error);
     })
 }



  decreaseDate() {
    let yesterday = this.state.date.setDate(this.state.date.getDate() - 1);
    this.setState({date: new Date(yesterday)});
  }

  increaseDate() {
    let tomorrow = this.state.date.setDate(this.state.date.getDate() + 1);
    this.setState({date: new Date(tomorrow)});
  }

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const date = this.state.date.toLocaleDateString("hu-HU", options);

    const blocks = this.state.dailyPlanBlocks.map((planBlock, index) => {
      let originalBlock = this.state.allBlocks.filter(block => block['_id'] === planBlock.id)
      let exerciseList = originalBlock[0].exerciseList;
      let exercises = [];
      let videoIdList = [];
      exerciseList.map(blockExerciseId => {
        let originalExercise = this.state.allExercises.filter(exercise => exercise['_id'] === blockExerciseId)
        let obj = {};
        obj.name = originalExercise[0].name;
        exercises.push(obj);
        videoIdList.push(originalExercise[0].movielink.split('?v=')[1]);
      })
      return <BlockElement key={ index + 1} title={originalBlock[0].name} exercises={exercises} videoIdList={videoIdList}></BlockElement>
    });

    return (<div className="UserDailyplan my-5">
      <Card style={{
          width: '90%'
        }} className="mx-auto p-4 bg-white text-left">
        <Card.Body className="card-body">
          <h3>Napi gyakorlataim</h3>
          <div className="d-flex align-items-center">
              <button className="font" onClick={this.decreaseDate}>&#8249;</button>
              <span className="text-center">{date}</span>
              <button className="font" onClick={this.increaseDate}>&#8250;</button>
          </div>
          <hr/>
          {blocks}
        </Card.Body>
      </Card>
    </div>);
  }
}

export default UserDailyplan;
