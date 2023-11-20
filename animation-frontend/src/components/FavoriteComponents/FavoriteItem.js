import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FavoriteItem({ FavoriteList }) {
  const localurl = useSelector((state) => state.AniState.url);
  const { id, title } = FavoriteList;
  const navigate = useNavigate();
  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  return (
    <Card className="anicard" key={FavoriteList.id} style={{ float: 'left' }}>
      <Card.Img
        variant="top"
        src={`${localurl}/File/AniImgFile/${FavoriteList.photo}`}
        onClick={Detailgo}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body className="p-0">
        <Card.Title className="mb-0 CardTitle" style={{ fontSize: '0.95rem' }}>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default FavoriteItem;
