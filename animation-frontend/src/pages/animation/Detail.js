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
      <Container className="my-4">
        <Row>
          <Col md={7}>
            <h1>{detailAni.title}</h1>
            <p>
              <StrongStyled>장르:</StrongStyled> {detailAni.genre}
            </p>
            <h3>줄거리</h3>
            <p>{detailAni.content}</p>
            <P_Styled>
              <StrongStyled>평점 </StrongStyled>
              {detailAni.averageRating}
              <StarImg src="../projectimg/star/free-star.jpg"></StarImg>
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
        <div>재생사진</div>
        <h2>재생하기</h2>
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
  border-radius: 5px;
  margin-top: 5px;
`;

const StarImg = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 4px;
`;

const StrongStyled = styled.strong`
  height: 25px;
  margin: 0;
  padding: 0;
  line-height: 25px;
`;

const P_Styled = styled.p`
  height: 25px;
  line-height: 25px;
`;

export default Detail;
