import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function DetailFreeBoard() {
  const navigate = useNavigate();
  const freeBoardGo = () => {
    navigate('/freeBoard');
  };

  return (
    <div className="container">
      <h2></h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="fbTitle" value={''} readOnly={true} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="text"
            name="fbContent"
            value={''}
            readOnly={true}
            style={{ height: '600px' }}
          />
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
