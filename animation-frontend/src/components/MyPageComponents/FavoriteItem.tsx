import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';

interface FavoriteItemProp {
  FavoriteList: AnidataTs;
}

const FavoriteItem = ({ FavoriteList }: FavoriteItemProp) => {
  const { id, title } = FavoriteList;
  const navigate = useNavigate();
  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  return (
    <Card className="anicard" key={FavoriteList.id}>
      <Card.Img
        variant="top"
        src={`${API_URL}/file/AniImgFile/${FavoriteList.photo}`}
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
};

export default FavoriteItem;
