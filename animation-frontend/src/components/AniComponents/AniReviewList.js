import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  AniReviewEm,
  AniReviewEm2,
  AniReviewListDiv,
  AniReviewListDivBox,
  AniReviewListLi,
  AniReviewListLi2,
  AniReviewListUl,
  AniReviewListUsername,
  AniRreiewListCol,
  AniStarImgList,
  LlikeImg,
  Pstyled2,
  Pstyled3,
} from '../../styledcomponents/AniReview.styled';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosAPI from '../../axiosAPI';
import { useSelector } from 'react-redux';
import { setReuseEffect } from '../../Redux/AniAction';
import store from '../../Redux/store';

function AniReviewList({ Ani_Id }) {
  function DateTime(reviewDate) {
    const date = new Date(reviewDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  const [Loading, setLoading] = useState(true);
  const [ReViewData, setReviewData] = useState([]);
  const [LikeList, setLikeList] = useState([]);
  const ReuseEffect = useSelector((state) => state.AniState.ReuseEffect);
  const loginID = window.sessionStorage.getItem('loginID');
  useEffect(() => {
    if (Ani_Id !== null) {
      const ReviewList = async () => {
        try {
          const res = await axiosAPI.post(`/Ani/ReviewListGetData`, {
            Ani_id: Ani_Id,
            memberMid: loginID,
          });
          const res2 = await axiosAPI.post(`/Ani/ReviewLikeCheck`, {
            memberMid: loginID,
          });
          setReviewData(res.data);
          setLikeList(res2.data.map((data) => data?.aniReview?.reviewId));
        } finally {
          setLoading(false);
        }
      };
      ReviewList();
    }
  }, [ReuseEffect]);

  const LikeUp = async (reviewId) => {
    if (loginID === null) {
      alert('로그인 하셔야 좋아요를 보낼수있어요!');
      return;
    }
    const res = await axiosAPI.post(`/Ani/ReviewLikeUp`, {
      reviewId: reviewId,
      memberMid: loginID,
    });
    store.dispatch(setReuseEffect(ReuseEffect + 1));
  };

  return (
    <>
      {!Loading ? (
        <>
          <Row style={{ marginTop: '30px' }}>
            <Col>
              <Pstyled2>리뷰({ReViewData.length})</Pstyled2>
            </Col>
            <Col>
              <Pstyled3>좋아요순</Pstyled3>
            </Col>
          </Row>
          {ReViewData.map((data) => (
            <Row
              key={data.review_id}
              style={{ borderBottom: '1px solid lightgray' }}
            >
              <AniRreiewListCol>
                <AniReviewListDivBox>
                  <AniReviewListUl>
                    <AniReviewListLi>
                      {[...Array(5)].map((_, index) => (
                        <AniStarImgList
                          key={index}
                          src={
                            index < data.rating
                              ? '/projectimg/star/star2.png'
                              : '/projectimg/star/star1.png'
                          }
                        ></AniStarImgList>
                      ))}
                      <AniReviewEm>{data.rating}점</AniReviewEm>
                    </AniReviewListLi>
                    <AniReviewListLi2>
                      {DateTime(data.reviewDate)}
                    </AniReviewListLi2>
                  </AniReviewListUl>
                  <AniReviewListUsername>
                    {data.memberMid}
                  </AniReviewListUsername>
                </AniReviewListDivBox>
                <AniReviewListDiv>{data.reviewText}</AniReviewListDiv>
                <div
                  onClick={() => {
                    LikeUp(data.reviewId);
                  }}
                  style={{ cursor: 'pointer', width: '40px' }}
                >
                  {LikeList.includes(data.reviewId) ? (
                    <LlikeImg src="/projectimg/likes/free-icon1.png"></LlikeImg>
                  ) : (
                    <LlikeImg src="/projectimg/likes/free-icon2.png"></LlikeImg>
                  )}

                  <AniReviewEm2>{data.likes}</AniReviewEm2>
                </div>
              </AniRreiewListCol>
            </Row>
          ))}
        </>
      ) : null}
    </>
  );
}

export default AniReviewList;
