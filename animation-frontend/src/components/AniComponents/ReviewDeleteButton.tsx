import React from 'react';
import { AniReviewTs } from 'src/model/Animation';
import { FooterUD } from 'src/styledcomponents/AniReview.styled';

interface ReviewDeleteButtonProps {
  ReviewUpdate: (
    ReviewUpdateModeId: number,
    ReviewUpdateModeText: string,
  ) => void;
  ReviewDelete: (ReviewDeleteId: number) => Promise<void>;
  data: AniReviewTs;
}

const ReviewDeleteButton = ({
  ReviewUpdate,
  ReviewDelete,
  data,
}: ReviewDeleteButtonProps) => {
  return (
    <>
      <FooterUD onClick={() => ReviewUpdate(data.reviewId, data.reviewText)}>
        수정
      </FooterUD>
      <FooterUD onClick={() => ReviewDelete(data.reviewId)}>삭제</FooterUD>
    </>
  );
};

export default ReviewDeleteButton;
