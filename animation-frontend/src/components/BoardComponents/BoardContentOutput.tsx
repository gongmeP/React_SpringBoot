import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { API_URL } from 'src/axiosAPI';
import { PostContainer } from 'src/styledcomponents/FreeBoard.styled';
import DateTime from '../DateTimeComponents/DateTime';
import { BoardTs } from 'src/model/Board';

interface BoardContentOutputProp {
  formData: BoardTs;
}

const BoardContentOutput = ({ formData }: BoardContentOutputProp) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const image = new Image();
    image.src = `${API_URL}/file/${formData.photo}`;
    image.onload = () => {
      setImageDimensions({
        width: image.naturalWidth / 2,
        height: image.naturalHeight / 2,
      });
    };
  }, [formData.photo]);
  return (
    <>
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
              <p className="mb-3">
                작성일 : <DateTime DateData={formData.fbDate}></DateTime>
              </p>
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
          {formData.photo ? (
            <img
              src={`${API_URL}/file/${formData.photo}`}
              alt="이미지"
              style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
              }}
            />
          ) : null}
        </PostContainer>
      </Form>
    </>
  );
};

export default BoardContentOutput;
