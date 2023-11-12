import axios from 'axios';
import React from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function AniItem({ Anidata }) {
  const { id, title } = Anidata;

  const navigate = useNavigate();

  const Detailgo = () => {
    navigate('/Ani/' + id);
  };

  // const deletAni = async () => {
  //   const res = await axios.delete(`http://localhost:8080/Ani/${id}`);
  //   if (res.data === 'ok') {
  //     alert('삭제되었습니다');
  //   } else {
  //     alert('삭제실패');
  //   }
  // };

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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to={`/updateForm/${id}`}>
            <a className="btn btn-warning">수정</a>
          </Link>
        </div>
        <Uploaded>업로드 상태 : {Anidata.uploaded.toUpperCase()}</Uploaded>
        {/* <Form.Check
          key={id}
          type="checkbox"
          id={id}
          // onChange={id}
          style={{ textAlign: 'center' }}
        /> */}
      </Card.Body>
    </Card>
  );
}
const Uploaded = styled.div`
  text-align: center;
`;

export default AniItem;
