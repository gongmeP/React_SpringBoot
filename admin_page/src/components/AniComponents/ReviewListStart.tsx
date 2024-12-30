import React from 'react';
import { AniReviewTs } from 'src/model/Animation';
import {
  AniReviewEm,
  AniStarImgList,
} from 'src/styledcomponents/AniReview.styled';

interface ReviewListStartProps {
  data: AniReviewTs;
}

const ReviewListStart = ({ data }: ReviewListStartProps) => {
  return (
    <>
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
    </>
  );
};

export default ReviewListStart;
