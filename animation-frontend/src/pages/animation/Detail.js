import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  AniImg,
  DetailAniImg,
  P_Styled,
  P_Styled2,
  PlayDiv_Styled,
  PlayImg_Styled,
  StarImg,
  StrongStyled,
} from '../../styledcomponents/AniDetail.styled';
import axiosAPI, { API_URL } from '../../axiosAPI';

function Detail(props) {
  const userid = sessionStorage.getItem('loginID');
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();

  const [detailAni, setDetailAni] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosAPI.get(`/Ani/${id}`);
      setDetailAni(res.data);
    };
    fetch();
  }, []);

  const [favoriteOK, setFavoriteOK] = useState({});
  useEffect(() => {
    const fetch2 = async () => {
      if (detailAni.id !== undefined) {
        const res2 = await axiosAPI.post(`/Favorite/Check`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });
        setFavoriteOK(res2.data);
      }
    };
    fetch2();
  }, [detailAni.id, userid]);

  const favorite = async () => {
    if (!window.sessionStorage.getItem('loginID')) {
      alert('로그인 후 보관함 사용이 가능해요.');
      navigate('/loginForm');
      return;
    }
    try {
      const res = await axiosAPI.post(`/Favorite`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });

      const res2 = await axiosAPI.post(`/Favorite/Check`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });
      setFavoriteOK(res2.data);
      alert('보관함에 추가되었어요!!');
    } catch (error) {
      console.error('Detail axios Error');
    }
  };

  const favoriteDelete = async () => {
    try {
      const res = await axiosAPI.post(`/Favorite/Delete`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });

      const res2 = await axiosAPI.post(`/Favorite/Check`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });
      setFavoriteOK(res2.data);
      alert('보관함에서 제거되었습니다.');
    } catch (error) {
      console.error('Detail axios Error');
    }
  };

  const Playvideo = async () => {
    if (!window.sessionStorage.getItem('loginID')) {
      alert('로그인 후 서비스 이용이 가능해요.');
      navigate('/loginForm');
      return;
    }
    try {
      const res = await axiosAPI.put(`/Ani/ViewCounter/${id}`);
      const res2 = await axiosAPI.post(`/ViewList`, {
        Ani_id: detailAni.id,
        member_mid: userid,
      });
      window.open('https://laftel.net/', '_blank');
    } catch (error) {
      console.error('ViewCounter axios Error');
    }
  };

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
            <DetailAniImg
              src={`${API_URL}/file/AniImgFile/${detailAni.photo}`}
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
            <PlayImg_Styled
              src="../projectimg/button/play.png"
              onClick={Playvideo}
            />
            <PlayDiv_Styled onClick={Playvideo}>재생하기</PlayDiv_Styled>
            {favoriteOK === '보관함 있음' ? (
              <>
                <PlayImg_Styled
                  src="../projectimg/button/minus.png"
                  onClick={favoriteDelete}
                />
                <PlayDiv_Styled onClick={favoriteDelete}>
                  보관함 제거
                </PlayDiv_Styled>
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
    </>
  );
}

export default Detail;
