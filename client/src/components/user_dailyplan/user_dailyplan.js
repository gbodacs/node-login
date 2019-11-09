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
    let newI = this.state.i + 1;
    this.setState({i: newI});
    this.setState({videoId: 'played'});
    this.setState({videoId: this.state.videoIdList[newI]});
    if (this.state.i === this.state.videoIdList.length) {
      this.handleCloseModal();
    }
  }

  render() {
    const exercises = this.props.exercises.map((exercise, index) => {
      return <ListGroup.Item className="bg-dark" key={index}><h6>{exercise.name}</h6><br></br><small>{exercise.comment}</small></ListGroup.Item>
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
        <Card.Title className="text-align-center p-3">{this.props.title}</Card.Title>
        <Card.Body className="bg-dark block-card-body" onClick={this.handleOpenModal}>
          <ListGroup>
            {exercises}
          </ListGroup>
          <button className="position-relative youtubeButton" >
            <i className="fab fa-youtube"></i>
          </button>
        </Card.Body>
        <Modal isOpen={this.state.showModal} contentLabel="OPEN">
          <button className="youtubeClose rounded-circle" onClick={this.handleCloseModal}>
            <i className="fas fa-times"></i>
          </button>
          <div className="d-flex justify-content-center">
            <YouTube videoId={this.state.videoId} opts={opts} onEnd={this.onEnd}/>
          </div>
        </Modal>
      </Card>
    );
  }
}

class UserDailyplan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      dailyPlanBlocks: [],
      dailyPlanComment: '',
      allBlocks: [],
      allExercises: []
    };
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
    this.getUserDailyplanData = this.getUserDailyplanData.bind(this);
  }

  componentDidMount () {
     this.getUserDailyplanData();
  }

  getUserDailyplanData() {
    const blockData = {
      id: this.state.userId,
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
              try{
                this.setState({
                  dailyPlanBlocks: data[0].blocks,
                  dailyPlanComment: data[0].comment,
                  allBlocks: data[0].allBlocks,
                  allExercises: data[0].allExercises,
                  noDailyPlan: false
                });
              } catch(error) {
                this.setState({noDailyPlan: true});
              }
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
    this.getUserDailyplanData();
  }

  increaseDate() {
    let tomorrow = this.state.date.setDate(this.state.date.getDate() + 1);
    this.setState({date: new Date(tomorrow)});
    this.getUserDailyplanData();
  }

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const date = this.state.date.toLocaleDateString("hu-HU", options);

    let message;
    let blocks;
    if (this.state.noDailyPlan) {
      message = <div>Kedves <b>{this.state.userName}</b>, erre a napra nincs gyakorlatod!</div>
      blocks = <div></div>
    } else {
      message = <div></div>
      blocks = this.state.dailyPlanBlocks.map((planBlock, index) => {
        let originalBlock = this.state.allBlocks.filter(block => block['_id'] === planBlock.id)
        let exerciseList = originalBlock[0].exerciseList;
        let exercises = [];
        let videoIdList = [];
        exerciseList.forEach(blockExerciseId => {
          let originalExercise = this.state.allExercises.filter(exercise => exercise['_id'] === blockExerciseId)
          let obj = {};
          obj.name = originalExercise[0].name;
          obj.comment = originalExercise[0].comment;
          exercises.push(obj);
          videoIdList.push(originalExercise[0].movielink.split('?v=')[1]);
        })
        return <BlockElement key={ index + 1} title={originalBlock[0].name} exercises={exercises} videoIdList={videoIdList}></BlockElement>
      });
    }

    return (
      <div className="UserDailyplan my-5">
      <div style={{width: '90%'}} className="mx-auto p-4 bg-white text-left">
          <h3>Napi gyakorlataim</h3>
          <div className="d-flex align-items-center">
              <button className="font" onClick={this.decreaseDate}>&#8249;</button>
              <span className="text-center">{date}</span>
              <button className="font" onClick={this.increaseDate}>&#8250;</button>
          </div>
        </div>
        <div className="mx-auto card-grid-view">{blocks}</div>
        {message}
      </div>
    );
  }
}

export default UserDailyplan;
