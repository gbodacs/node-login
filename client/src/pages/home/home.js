import React from 'react';
import './home.scss';
import Header from '../../components/header/header';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: true
    }
  }

  render() {
    return (
      <div className="Home">
        <Header isAdmin={this.state.isAdmin} />
        <div className="Home-header">
          <p>
            Edit <code>src/Home.js</code> and save to reload.
          </p>
          <a
            className="Home-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
