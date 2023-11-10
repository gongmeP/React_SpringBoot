import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  AniImg,
  P_Styled,
  P_Styled2,
  PlayDiv_Styled,
  PlayImg_Styled,
  StarImg,
  StrongStyled,
} from '../../styledcomponents/AniDetail.styled';
import { useSelector } from 'react-redux';

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

  const [favoriteOK, setFavoriteOK] = useState({});
  useEffect(() => {
    const fetch2 = async () => {
      if (detailAni.id !== undefined) {
        const res2 = await axios.post(`http://localhost:8080/Favorite/Check`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });
        setFavoriteOK(res2.data);
      }
    };
    fetch2();
  }, [detailAni.id]);

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

  const favorite = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/Favorite`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });

      console.log(res.data);
    } catch (error) {
      console.error('Detail axios Error');
    }
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
            {favoriteOK === '보관함 있음' ? (
              <>
                <PlayImg_Styled
                  src="../projectimg/button/minus.png"
                  onClick={favorite}
                />
                <PlayDiv_Styled onClick={favorite}>보관함 제거</PlayDiv_Styled>
              </>
            ) : (
              <>
                <PlayImg_Styled
                  src="../projectimg/button/plus.png"
                  onClick={favorite}
                />
                <PlayDiv_Styled onClick={favorite}>보관함 추가</PlayDiv_Styled>
              </>
            )}
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

export default Detail;
