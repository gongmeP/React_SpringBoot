import React from 'react';
import { AniOderBy, Pstyled3 } from 'src/styledcomponents/AniReview.styled';

interface ReviewOrderByProps {
  OderByClick: () => void;
  OderByLike: boolean;
  Before: string;
  After: string;
}

const ReviewOrderBy = ({
  OderByClick,
  OderByLike,
  Before,
  After,
}: ReviewOrderByProps) => {
  return (
    <>
      <Pstyled3 onClick={OderByClick}>
        {OderByLike ? `${Before}` : `${After}`}
        <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
      </Pstyled3>
    </>
  );
};

export default ReviewOrderBy;
