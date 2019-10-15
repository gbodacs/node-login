import React from 'react';
import './footer.scss';
import Card from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {
    return (<Card bg="white" className="footer fixed-bottom font-bold text-center">
      <Card.Footer>
        <Card.Link>Copyright © 2019 | Az oldalt a TEAM működteti</Card.Link>
        <Card.Link>Kapcsolat</Card.Link>
        <Card.Link href="/terms">Adatvédelmi elvek</Card.Link>
        <Card.Link>Süti szabályzat</Card.Link>
      </Card.Footer>
    </Card>);
  }
}

export default Footer;
