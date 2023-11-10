import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AniItem({ Anidata }) {
  const { id, title } = Anidata;

  return (
    // <Row className="" style={{ margin: '0 auto', float: 'left' }}>
    <Card className="anicard" key={Anidata.id}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <Link to={'/Ani/' + id} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>
    // </Row>
  );
}

export default AniItem;
