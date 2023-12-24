import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  DetailAniImg,
  P_Styled,
  P_Styled2,
  PlayDiv_Styled,
  PlayImg_Styled,
  StarImg,
  StrongStyled,
} from '../../styledcomponents/AniDetail.styled';
import axiosAPI, { API_URL } from '../../axiosAPI';
import AniReview from '../../components/AniComponents/AniReview';
import AniReviewList from '../../components/AniComponents/AniReviewList';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import { AnidataTs } from 'src/model/Animation';
import AniDetailHead from 'src/components/AniComponents/AniDetailHead';
import Anifavorite from 'src/components/AniComponents/Anifavorite';

function Detail() {
  const [Loading, setLoading] = useState(true);
  const userid = sessionStorage.getItem('loginID');
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();
  const ReuseEffect = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );

  const [detailAni, setDetailAni] = useState<AnidataTs | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosAPI.get(`/Ani/${id}`);
      setDetailAni(res.data);
    };
    fetch();
  }, [ReuseEffect]);

  const [favoriteOK, setFavoriteOK] = useState<string>('');
  useEffect(() => {
    const fetch2 = async () => {
      if (detailAni && detailAni.id !== undefined) {
        try {
          const res2 = await axiosAPI.post(`/Favorite/Check`, {
            Ani_id: detailAni.id,
            member_mid: userid,
          });
          setFavoriteOK(res2.data);
        } finally {
          setLoading(false);
        }
      }
    };
    fetch2();
  }, [detailAni?.id, userid]);

  const deletAni = async () => {
    if (window.confirm('애니메이션 데이터를 삭제할까요?')) {
      const res = await axiosAPI.put(`/Ani/DeleteY/${id}`);
      if (res.data === '삭제완료') {
        alert('삭제되었습니다');
        navigate('/allList');
      } else {
        alert('삭제오류');
      }
    } else {
    }
  };

  return (
    <>
      {!Loading && detailAni !== null ? (
        <>
          <Container className="mb-4">
            <AniDetailHead detailAni={detailAni}></AniDetailHead>
            {/* 애니 상단 컴포넌트 */}
            <Row>
              <Col
                md={9}
                style={{ height: '60px', display: 'flex' }}
                className="mt-2"
              >
                <Anifavorite
                  detailAni={detailAni}
                  id={id}
                  favoriteOK={favoriteOK}
                  setFavoriteOK={setFavoriteOK}
                  Loading={Loading}
                />
                {/* 보관함 컴포넌트 */}
              </Col>
            </Row>
            <AniReviewList Ani_Id={detailAni.id}></AniReviewList>
            {/* 별점 리뷰 리스트 컴포넌트 */}
          </Container>
          <Link to={`/updateForm/${id}`} style={{ marginRight: '15px' }}>
            <a className="btn btn-warning">수정</a>
          </Link>
          <Button variant="danger" onClick={deletAni}>
            삭제
          </Button>
        </>
      ) : null}
    </>
  );
}

export default Detail;
