import React from 'react';
import './connection.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/footer';

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }

  redirectToHomePage() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <div className="Connection">
          <Card>
            <Card.Body
              variant="primary"
              className="Connec card-body">
                <h3>Kapcsolat</h3>
                <hr/>

                <span className="connect-container pr-3"><i className="fas fa-phone-square"></i></span><strong > +36 2o / 248 9 86o</strong>
                <br/>
                <span className="connect-container pr-3"><i className="fas fa-envelope"></i></span><strong>testtartasterapia<i> kukac-gmail-pont-c0m </i></strong>
                <br/>
                <span className="connect-container pr-3"><i className="fas fa-address-card"></i></span><strong>Nyilvántartási szám: 54050291</strong>
                <br/>
                <span className="connect-container pr-3"><i className="fas fa-map"></i></span><strong> 1048 - Budapest, Bőröndös utca 12.</strong>
                <hr/>


                <div className="social-container d-flex justify-content-center">
                <a href="https://www.facebook.com/testtartasterapia/" className="facebook social"><i className="fab fa-facebook-square"></i></a>
                <a href="https://testtartasterapia.hu/" className="blog social"><i className="fab fa-blogger"></i></a>
                <a href="https://www.youtube.com/channel/UCWP8aMtneWxm8bFH9l1dxyQ" className="youtube social"><i className="fab fa-youtube-square"></i></a>
                </div>
                <Button variant="primary" type="button" onClick={this.redirectToHomePage}><span className="pr-3"><i className="fas fa-home"></i></span>Vissza a főoldalra</Button>
            </Card.Body>
          </Card>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Connection;
