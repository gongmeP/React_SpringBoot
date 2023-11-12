import React from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to={`/updateForm/${id}`}>
            <a className="btn btn-warning">수정</a>
          </Link>
          <Button variant="danger">삭제</Button>
        </div>
        <Form.Check
          key={id}
          type="checkbox"
          id={id}
          // onChange={id}
          style={{ textAlign: 'center' }}
        />
      </Card.Body>
    </Card>
  );
}

export default AniItem;
