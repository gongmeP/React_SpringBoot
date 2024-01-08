import React from 'react';
import {
  AniReviewListDiv,
  AniReviewListDivBox,
  AniReviewListFooter,
  AniReviewListLi,
  AniReviewListLi2,
  AniReviewListUl,
  AniReviewListUsername,
} from 'src/styledcomponents/AniReview.styled';
import ReviewListStart from './ReviewListStart';
import DateTime from '../DateTimeComponents/DateTime';
import LikeUpButton from './LikeUpButton';
import ReviewDeleteButton from './ReviewDeleteButton';
import { AniReviewTs } from 'src/model/Animation';

interface ReviewListBoxProps {
  LikeUp: (reviewId: number, memberMid: string) => Promise<void>;
  data: AniReviewTs;
  LikeList: number[];
  ReviewDelete: (ReviewDeleteId: number) => Promise<void>;
}

const ReviewListBox = ({
  data,
  LikeUp,
  LikeList,
  ReviewDelete,
}: ReviewListBoxProps) => {
  return (
    <>
      <AniReviewListDivBox>
        <AniReviewListUl>
          <AniReviewListLi>
            <ReviewListStart data={data}></ReviewListStart>
            {/*별점 컴포넌트*/}
          </AniReviewListLi>
          <AniReviewListLi2>
            <DateTime DateData={data.reviewDate}></DateTime>
          </AniReviewListLi2>
        </AniReviewListUl>
        <AniReviewListUsername>{data.memberMid}</AniReviewListUsername>
      </AniReviewListDivBox>
      <AniReviewListDiv>{data.reviewText}</AniReviewListDiv>
      <AniReviewListFooter>
        <LikeUpButton
          LikeUp={LikeUp}
          data={data}
          LikeList={LikeList}
        ></LikeUpButton>
        {/*좋아요 버튼 컴포넌트*/}
        <AniReviewListFooter>
          <ReviewDeleteButton
            ReviewDelete={ReviewDelete}
            data={data}
          ></ReviewDeleteButton>
          {/*리뷰 삭제 버튼 컴포넌트*/}
        </AniReviewListFooter>
      </AniReviewListFooter>
    </>
  );
};

export default ReviewListBox;
