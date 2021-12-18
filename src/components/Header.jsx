import {Card} from 'react-bootstrap';

export default function Header(props) {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title><b>{props.turn}</b></Card.Title>
          <Card.Text>
            {props.text}
          </Card.Text>
        </Card.Body>
      </Card>
    );
    }