import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

function DetailFreeBoard() {
  const { fbNum } = useParams();
  const navigate = useNavigate();
  const freeBoardGo = () => {
    navigate('/freeBoard');
  };

  const [formData, setFormData] = useState({});

  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  console.log(fbNum);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/Detail/${fbNum}`)
      .then((res) => res.json())
      .then((res) => {
        setFormData(res[0]);
        console.log(res[0]);
      });
  }, []);

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

          <Form.Control
            as="textarea"
            rows={10}
            name="fbContent"
            value={formData.fbContent}
            readOnly={true}
            style={{ textAlign: 'left', resize: 'none', height: '450px' }}
          >
            {/* <div style={{ height: '600px' }}>
              <img src="imageUrl" fluid />
            </div> */}
          </Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
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

export default DetailFreeBoard;
