import axios from 'axios';
import React from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from '../../Redux/store';

function AniItem({ Anidata, reEffect, setReEffect }) {
  const { id, title } = Anidata;

  const navigate = useNavigate();

  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  const deletAni = async () => {
    if (window.confirm('애니메이션 데이터를 삭제할까요?')) {
      const res = await axios.put(`http://localhost:8080/Ani/DeleteY/${id}`);
      if (res.data === '삭제완료') {
        alert('삭제되었습니다');
      } else {
        alert('삭제오류');
      }
      setReEffect(reEffect + 1);
    } else {
    }
  };

  return (
    <Card className="anicard" key={Anidata.id} style={{ float: 'left' }}>
      <Card.Img
        variant="top"
        src={`http://localhost:8080/file/AniImgFile/${Anidata.photo}`}
        onClick={Detailgo}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body className="pb-0">
        <Card.Title className="mb-0 CardTitle" style={{ fontSize: '1rem' }}>
          {title}
        </Card.Title>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to={`/updateForm/${id}`}>
            <Button variant="warning" size="sm" className="mb-1 mt-1">
              수정
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            className="mb-1 mt-1"
            onClick={deletAni}
          >
            삭제
          </Button>
        </div>
        <Uploaded>업로드 상태 : {Anidata.uploaded.toUpperCase()}</Uploaded>
      </Card.Body>
    </Card>
  );
}
const Uploaded = styled.div`
  text-align: center;
`;

export default AniItem;
