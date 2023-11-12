import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AniItem({ Anidata }) {
  const { id, title } = Anidata;
  const navigate = useNavigate();
  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  return (
    <Card className="anicard" key={Anidata.id} style={{ float: 'left' }}>
      <Card.Img
        variant="top"
        src={`http://localhost:8080/file/AniImgFile/${Anidata.photo}`}
        onClick={Detailgo}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AniItem;
