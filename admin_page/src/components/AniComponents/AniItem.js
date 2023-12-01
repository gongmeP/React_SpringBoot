import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { Uploaded } from '../../styledcomponents/AniDetail.styled';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import { setReuseEffect } from '../../Redux/AniAction';

function AniItem({ Anidata }) {
  const ReuseEffect = useSelector((state) => state.AniState.ReuseEffect);
  const { id, title } = Anidata;
  const navigate = useNavigate();
  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  const deletAni = async () => {
    if (window.confirm('애니메이션 데이터를 삭제할까요?')) {
      const res = await axiosAPI.put(`/Ani/DeleteY/${id}`);
      if (res.data === '삭제완료') {
        alert('삭제되었습니다');
      } else {
        alert('삭제오류');
      }
      store.dispatch(setReuseEffect(ReuseEffect + 1));
    } else {
    }
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

export default AniItem;
