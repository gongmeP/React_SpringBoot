import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styledcomponents/BootStrapcss.css';
import {
  AniImg,
  P_Styled,
  P_Styled2,
  PlayDiv_Styled,
  PlayImg_Styled,
  StarImg,
  StrongStyled,
} from '../../styledcomponents/AniDetail.styled';

function Detail(props) {
  const userid = sessionStorage.getItem('loginID');
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();

  const [detailAni, setDetailAni] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:8080/Ani/${id}`);
      setDetailAni(res.data);
    };
    fetch();
  }, []);

  // const deletAni = async () => {
  //   const res = await axios.delete(`http://localhost:8080/Ani/${id}`);
  //   if (res.data === 'ok') {
  //     alert('삭제되었습니다');
  //   } else {
  //     alert('삭제실패');
  //   }
  // };

  return (
    <>
      <Container className="mb-4">
        <Row>
          <Col md={7}>
            <h1>{detailAni.title}</h1>
            <P_Styled2>
              {detailAni.dayOfWeek === '완결'
                ? `${detailAni.genre} / ${detailAni.dayOfWeek}`
                : `${detailAni.genre} / 방영중`}
            </P_Styled2>
            <h3>줄거리</h3>
            <P_Styled2>{detailAni.content}</P_Styled2>
            <P_Styled>
              <StrongStyled>평점 </StrongStyled>
              {detailAni.averageRating}
              <StarImg
                src="../projectimg/star/free-star.jpg"
                alt="별점"
              ></StarImg>
            </P_Styled>
          </Col>
          <Col md={5} className="aniimgs">
            <AniImg
              src={`http://localhost:8080/file/AniImgFile/${detailAni.photo}`}
              alt="애니 포스터"
              fluid
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={9}
            style={{ height: '60px', display: 'flex' }}
            className="mt-2"
          ></Col>
        </Row>
      </Container>

      <Link to={`/updateForm/${id}`}>
        <a className="btn btn-warning">수정</a>
      </Link>
      {/* <Button variant="danger" onClick={deletAni}>
        삭제
      </Button> */}
    </>
  );
}

export default Detail;
