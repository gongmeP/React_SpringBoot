import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

function DetailFreeBoard() {
  const { fbNum } = useParams();

  const navigate = useNavigate();

  const freeBoardGo = () => {
    navigate('/freeBoard');
  };
  const UpdatefreeBoardGo = () => {
    navigate(`/updateFreeBoard/${fbNum}`);
  };

  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  const [formData, setFormData] = useState({});
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/Detail/${fbNum}`)
      .then((res) => res.json())
      .then((res) => {
        setFormData(res[0]);
        console.log(res[0]);
      });
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = `http://localhost:8080/file/${formData.photo}`;
    image.onload = () => {
      setImageDimensions({
        width: image.naturalWidth / 10,
        height: image.naturalHeight / 10,
      });
    };
  }, [formData.photo]);

  return (
    <div className="container">
      <h2></h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="fbTitle"
            value={formData.fbTitle}
            readOnly={true}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Row className="justify-content-center align-items-center">
            <Col md={4}>
              <p className="mb-3">글쓴이 : {formData.userid}</p>
            </Col>
            <Col md={4}>
              <p className="mb-3">작성일 : {DateTime(formData.fbDate)}</p>
            </Col>
            <Col md={2}>
              <p className="mb-3">조회수 : {formData.fbReadCount}</p>
            </Col>
            <Col md={2}>
              <p className="mb-3">댓글수 : {formData.replyCount}</p>
            </Col>
          </Row>
        </Form.Group>

        <PostContainer>
          {formData.fbContent}
          <img
            src={`http://localhost:8080/file/${formData.photo}`}
            alt="이미지"
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
            }}
          />
        </PostContainer>

        <div
          style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}
        >
          <Button
            variant="btn btn-warning"
            style={{ marginRight: '20px' }}
            onClick={UpdatefreeBoardGo}
          >
            게시글 수정하기
          </Button>
          <Button
            variant="primary"
            style={{ marginRight: '20px' }}
            onClick={freeBoardGo}
          >
            게시글 목록보기
          </Button>
        </div>
      </Form>
    </div>
  );
}

const PostContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(204, 204, 204, 0.6);
  padding: 10px;
  border-radius: 10px;
`;

export default DetailFreeBoard;
