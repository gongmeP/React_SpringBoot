import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Board from '../../components/BoardComponents/Board';
import { useSelector } from 'react-redux';
import Page from '../../components/BoardComponents/Page';
import store, { RootState } from '../../Redux/store';
import {
  setFormData,
  setFreeBoards,
  setFreeBoardsEA,
  setSearchTF,
} from '../../Redux/BoardAction';
import BoradSerch from '../../components/BoardComponents/BoardSerch';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { BoardTs } from 'src/model/Board';
import DateTime from 'src/components/DateTimeComponents/DateTime';

const DetailFreeBoard = () => {
  const Pages = useSelector((state: RootState) => state.BoardState.pages);
  const freeBoardsEA = useSelector(
    (stage: RootState) => stage.BoardState.freeBoardsEA,
  );
  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${Pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [Pages]);
  useEffect(() => {
    const TotalPage = async () => {
      const res = await axiosAPI.get(`/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
    };
    TotalPage();
  }, []);

  const { fbNum } = useParams();

  const navigate = useNavigate();

  const freeBoardGo = () => {
    navigate('/freeBoard');
  };
  const UpdatefreeBoardGo = () => {
    navigate(`/updateFreeBoard/${fbNum}`);
  };
  const DeletefreeBoardGo = async () => {
    if (window.confirm('게시글을 삭제 하시겠습니까?')) {
      const res = await axiosAPI.get(`/FreeBoard/Delete/${fbNum}`);
      if (res.data === 'DeleteOk') {
        alert('게시글이 삭제 되었습니다.');
        navigate('/freeBoard');
      } else {
        alert('게시글이 삭제 에러');
      }
    } else {
    }
  };

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const formData: BoardTs = useSelector(
    (state: RootState) => state.BoardState.formData,
  );

  // 디테일에서 밑에 게시판 클릭시 다시 재로드 시키는 부분임 !!
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axiosAPI.get(`/FreeBoard/Detail/${fbNum}`);
      store.dispatch(setFormData(res.data[0]));
    };
    fetchdata();
  }, [fbNum]);

  useEffect(() => {
    const image = new Image();
    image.src = `${API_URL}/file/${formData.photo}`;
    image.onload = () => {
      setImageDimensions({
        width: image.naturalWidth / 5,
        height: image.naturalHeight / 5,
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '40px',
            marginBottom: '100px',
            borderBottom: '2px dotted black',
            paddingBottom: '40px',
          }}
        >
          <Button
            variant="primary"
            style={{ marginRight: '20px' }}
            onClick={freeBoardGo}
          >
            게시글 목록보기
          </Button>
          <Button
            variant="warning"
            style={{ marginRight: '20px' }}
            onClick={UpdatefreeBoardGo}
          >
            수정
          </Button>
          <Button
            variant="danger"
            style={{ marginRight: '20px' }}
            onClick={DeletefreeBoardGo}
          >
            삭제
          </Button>
        </div>
      </Form>
      <Board></Board>
      <Page EA={freeBoardsEA} Pages={Pages}></Page>
      <BoradSerch></BoradSerch>
    </div>
  );
};

const PostContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(204, 204, 204, 0.6);
  padding: 10px;
  border-radius: 10px;
`;

export default DetailFreeBoard;
