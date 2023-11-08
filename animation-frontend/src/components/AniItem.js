import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AniItem({ Ani }) {
  const { id, title, author } = Ani;

  return (
    <Card className="anicard" key={Ani.id}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <Link to={'/Ani/' + id} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default AniItem;
