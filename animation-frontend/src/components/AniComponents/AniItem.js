import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../axiosAPI';

function AniItem({ Anidata }) {
  const { id, title } = Anidata;
  const navigate = useNavigate();
  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  return (
    <Card className="anicard" key={Anidata.id}>
      <Card.Img
        variant="top"
        src={`${API_URL}/file/AniImgFile/${Anidata.photo}`}
        onClick={Detailgo}
        style={{ cursor: 'pointer' }}
        className="anicardimg"
        loading="lazy"
      />
      <Card.Body className="p-0">
        <Card.Title className="mb-0 CardTitle" style={{ fontSize: '0.95rem' }}>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AniItem;
