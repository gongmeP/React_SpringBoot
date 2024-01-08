import React from 'react';
import { AniReviewTs } from 'src/model/Animation';
import { FooterUD } from 'src/styledcomponents/AniReview.styled';

interface ReviewDeleteButtonProps {
  ReviewDelete: (ReviewDeleteId: number) => Promise<void>;
  data: AniReviewTs;
}

const ReviewDeleteButton = ({
  ReviewDelete,
  data,
}: ReviewDeleteButtonProps) => {
  return (
    <>
      <FooterUD onClick={() => ReviewDelete(data.reviewId)}>삭제</FooterUD>
    </>
  );
};

export default ReviewDeleteButton;
