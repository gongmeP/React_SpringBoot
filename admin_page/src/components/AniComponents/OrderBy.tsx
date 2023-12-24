import React from 'react';
import { NewAndRankingDiv } from 'src/styledcomponents/AniList.styled';
import { AniOderBy } from 'src/styledcomponents/AniReview.styled';

interface OrderByOwnprops {
  setOderByAniCounter: (OderByAniCounter: boolean) => void;
  setPage: (page: number) => void;
  OderByAniCounter: boolean;
}

const OrderBy = ({
  setOderByAniCounter,
  setPage,
  OderByAniCounter,
}: OrderByOwnprops) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'right' }}>
      <NewAndRankingDiv
        onClick={() => {
          setPage(0);
          setOderByAniCounter(!OderByAniCounter);
        }}
      >
        {OderByAniCounter ? '인기순' : '최신순'}
        <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
      </NewAndRankingDiv>
    </div>
  );
};

export default OrderBy;
