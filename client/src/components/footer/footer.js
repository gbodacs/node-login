import React from 'react';
import './footer.scss';
import Card from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {
    return (<Card bg="light" className="footer fixed-bottom text-center">
      <Card.Footer>
        <Card.Link>Copyright © 2019 | Az oldalt a TEAM működteti</Card.Link>
        <Card.Link href="/connection">Kapcsolat</Card.Link>
        <Card.Link href="/terms?page=data">Adatvédelmi elvek</Card.Link>
        <Card.Link href="/terms?page=cookie">Süti szabályzat</Card.Link>
      </Card.Footer>
    </Card>);
  }
}

export default Footer;
