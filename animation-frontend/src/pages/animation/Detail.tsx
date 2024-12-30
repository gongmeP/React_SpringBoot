import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';
import AniReview from '../../components/AniComponents/AniReview';
import AniReviewList from '../../components/AniComponents/AniReviewList';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import { AnidataTs } from 'src/model/Animation';
import LoadingSpinner from 'src/components/MainComponents/LodingSpinner';
import AniDetailHead from 'src/components/AniComponents/AniDetailHead';
import Anifavorite from 'src/components/AniComponents/Anifavorite';

const Detail = () => {
  const [Loading, setLoading] = useState(true);
  const userid = sessionStorage.getItem('loginID');
  const propsParam = useParams();
  const id = propsParam.id;
  const ReuseEffect = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );

  const [detailAni, setDetailAni] = useState<AnidataTs | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosAPI.get(`/Ani/${id}`);
        setDetailAni(res.data);
      } finally {
        setLoading(false);
      }
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

  return (
    <>
      {!Loading && detailAni !== null ? (
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

          <AniReview Ani_Id={detailAni.id}></AniReview>
          {/* 별점 리뷰 컴포넌트 */}
          <AniReviewList Ani_Id={detailAni.id}></AniReviewList>
          {/* 별점 리뷰 리스트 컴포넌트 */}
        </Container>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
};

export default Detail;
