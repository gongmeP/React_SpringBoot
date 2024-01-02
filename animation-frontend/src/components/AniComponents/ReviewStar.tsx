import React from 'react';
import {
  AniReviewH3styled,
  AniStarDiv,
  AniStarImg,
  AniStarReview,
  Pstyled,
} from 'src/styledcomponents/AniReview.styled';

interface ReviewStarProps {
  Rating: number;
  starReviews: string[];
  StarOut: () => void;
  StarChange: (value: number) => void;
  StarRatingIn: () => void;
}

const ReviewStar = ({
  Rating,
  starReviews,
  StarOut,
  StarChange,
  StarRatingIn,
}: ReviewStarProps) => {
  return (
    <>
      <Pstyled>별점</Pstyled>
      <AniReviewH3styled>{Rating} 점</AniReviewH3styled>
      <AniStarReview>{starReviews[Rating]}</AniStarReview>
      <AniStarDiv onMouseLeave={StarOut}>
        {[...Array(5)].map((_, index) => (
          <AniStarImg
            key={index}
            src={
              index < Rating
                ? '/projectimg/star/star2.png'
                : '/projectimg/star/star1.png'
            }
            onMouseOver={() => StarChange(index)}
            onClick={() => StarRatingIn()}
          ></AniStarImg>
        ))}
      </AniStarDiv>
    </>
  );
};

export default ReviewStar;
