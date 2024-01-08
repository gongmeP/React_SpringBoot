import React from 'react';
import { AniReviewTs } from 'src/model/Animation';
import {
  AniReviewEm2,
  LikeUpBox,
  LlikeImg,
} from 'src/styledcomponents/AniReview.styled';

interface LikeUpButtonProps {
  LikeUp: (reviewId: number, memberMid: string) => Promise<void>;
  data: AniReviewTs;
  LikeList: number[];
}

const LikeUpButton = ({ LikeUp, data, LikeList }: LikeUpButtonProps) => {
  return (
    <>
      <LikeUpBox
        onClick={() => {
          LikeUp(data.reviewId, data.memberMid);
        }}
      >
        {LikeList.includes(data.reviewId) ? (
          <LlikeImg src="/projectimg/likes/free-icon1.png"></LlikeImg>
        ) : (
          <LlikeImg src="/projectimg/likes/free-icon2.png"></LlikeImg>
        )}

        <AniReviewEm2>{data.likes}</AniReviewEm2>
      </LikeUpBox>
    </>
  );
};

export default LikeUpButton;
