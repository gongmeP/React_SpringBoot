import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AniItem({ Anidata }) {
  const { id, title } = Anidata;

  return (
    <Card className="anicard" key={Anidata.id} style={{ float: 'left' }}>
      <Card.Img
        variant="top"
        src={`http://localhost:8080/file/AniImgFile/${AniALLArray.photo}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <Link to={'/Ani/' + id} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default AniItem;
