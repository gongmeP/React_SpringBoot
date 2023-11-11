import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ResetButton = () => {};

function genrefilter() {
  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={ResetButton}
        className="mb-3"
      >
        초기화
      </Button>
      <Form.Check type="checkbox" id="genre1" label="판타지" />
      <Form.Check type="checkbox" id="genre2" label="액션" />
      <Form.Check type="checkbox" id="genre3" label="개그" />
      <Form.Check type="checkbox" id="genre4" label="미스터리" />
      <Form.Check type="checkbox" id="genre5" label="로맨스" />
      <Form.Check type="checkbox" id="genre6" label="모험" />
      <Form.Check type="checkbox" id="genre7" label="SF" />
      <Form.Check type="checkbox" id="genre8" label="스포츠" />
      <Form.Check type="checkbox" id="genre9" label="아이돌" />
      <Form.Check type="checkbox" id="genre10" label="드라마" />
    </>
  );
}

export default genrefilter;
