import React from 'react';
import './terms_cookies.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Footer from '../../components/footer/footer';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: "default2",
      value: "data"
    };
  }

  redirectToHomePage() {
    this.props.history.push('/home');
  }

  handleChange(event, newValue) {
    if (newValue === "data") {
      this.setState({
        text: "data text",
        value: "data"
      });
    }
    
    if (newValue === "cookie") {
      this.setState({
        text: "kuki text",
        value: "cookie"
      });
    }

    console.log(event);
    console.log(newValue);
  }

  render() {
    return (  
      <Paper className="Terms mx-auto my-5">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Adatvédelmi elvek" value = "data"/>
          <Tab label="Süti szabályzat" value = "cookie"/>
        </Tabs>
        <Card className="Terms p-2 mx-auto my-5">
        <Card.Body>
          <Card.Title>Adatvédelmi és Adatkezelési szabályzat</Card.Title>
          <Card.Text>
            {this.state.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`mt-4`}>Vissza a főoldalra</Button>
        </Card.Footer>
      </Card>
      <Footer/>
      </Paper>
    );
  }
}

export default Terms;