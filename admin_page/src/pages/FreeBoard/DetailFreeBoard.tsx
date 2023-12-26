import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
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
import DateTime from 'src/components/DateTimeComponents/DateTime';
import BoardDetailButton from 'src/components/BoardComponents/BoardDetailButton';
import { PostContainer } from 'src/styledcomponents/FreeBoard.styled';

const DetailFreeBoard = () => {
  const { pages, freeBoardsEA, formData } = useSelector(
    (state: RootState) => state.BoardState,
  );

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [pages]);
  useEffect(() => {
    const TotalPage = async () => {
      const res = await axiosAPI.get(`/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
    };
    TotalPage();
  }, []);

  const { fbNum } = useParams();

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

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

        <BoardDetailButton
          fbNum={fbNum}
          userid={formData.userid}
        ></BoardDetailButton>
        {/* Board 버튼 컴포넌트 */}
      </Form>
      <Board></Board>
      {/* BoardList 컴포넌트 */}
      <br></br>
      <Page EA={freeBoardsEA} Pages={pages}></Page>
      {/* pageing 컴포넌트 */}
      <BoradSerch></BoradSerch>
      {/* 검색부분 컴포넌트 */}
    </div>
  );
};

export default DetailFreeBoard;
