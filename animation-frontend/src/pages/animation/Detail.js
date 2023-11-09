import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Detail(props) {
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

  const deleteBook = () => {
    fetch(`http://localhost:8080/Ani/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          navigate('/');
        } else {
          alert('삭제실패');
        }
      });
  };

  console.log(detailAni);

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
          >
            <PlayImg_Styled src="../projectimg/button/play.png" />
            <PlayDiv_Styled>재생하기</PlayDiv_Styled>
            <PlayImg_Styled src="../projectimg/button/plus.png" />
            <PlayDiv_Styled>즐겨찾기 추가</PlayDiv_Styled>
          </Col>
        </Row>
      </Container>

      <Link to={`/updateForm/${id}`}>
        <a className="btn btn-warning">수정</a>
      </Link>
      <Button variant="danger" onClick={deleteBook}>
        삭제
      </Button>
    </>
  );
}
const AniImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.3125rem;
  margin-top: 0.3125rem;
`;

const StarImg = styled.img`
  width: 1.5625rem;
  height: 1.5625rem;
  margin-bottom: 0.25rem;
`;

const StrongStyled = styled.strong`
  height: 1.5625rem;
  margin: 0;
  padding: 0;
  line-height: 1.5625rem;
`;

const P_Styled = styled.p`
  height: 1.5625rem;
  line-height: 1.5625rem;
`;

const P_Styled2 = styled.p`
  font-size: 1rem;
`;

const PlayImg_Styled = styled.img`
  height: 3.75rem;
  width: 3.75rem;
  cursor: pointer;
`;

const PlayDiv_Styled = styled.div`
  height: 3.75rem;
  width: 40%;
  font-size: 1.25rem;
  line-height: 3.75rem;
  cursor: pointer;
`;

export default Detail;
