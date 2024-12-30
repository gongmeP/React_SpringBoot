import React from 'react';
import {
  Pstyled,
  ReviewText,
  ReviewTextBoxDiv,
  ReviewTextButton,
} from 'src/styledcomponents/AniReview.styled';

interface ReviewAddButtonProps {
  TextInChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  ReviewTextAdd: () => void;
  buttontext: string;
  headtext: string;
}

const ReviewAddButton = ({
  TextInChange,
  text,
  ReviewTextAdd,
  buttontext,
  headtext,
}: ReviewAddButtonProps) => {
  return (
    <>
      <Pstyled>{headtext}</Pstyled>
      <ReviewTextBoxDiv>
        <ReviewText onChange={TextInChange} value={text} />
        <ReviewTextButton onClick={ReviewTextAdd}>
          {buttontext}
        </ReviewTextButton>
      </ReviewTextBoxDiv>
    </>
  );
};

export default ReviewAddButton;
