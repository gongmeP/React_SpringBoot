import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import AniItemsCarousel from './AniItemsCarousel';
import AniRankingButton from './AniRankingButton';

const AniRanking = () => {
  const [AllRank, setAllRank] = useState<AnidataTs[]>([]);
  const [ButtonActive, setButtonActive] = useState<string>('allTime');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  useEffect(() => {
    const AniAllRanking = async () => {
      let res;
      if (ButtonActive === 'today') {
        res = await axiosAPI.get(`/Ani/AniOneDayRanking`);
      } else if (ButtonActive === 'thisWeek') {
        res = await axiosAPI.get(`/Ani/AniWeekRanking`);
      } else {
        res = await axiosAPI.get(`/Ani/AniAllRanking`);
      }
      setAllRank(res.data);
    };
    AniAllRanking();
  }, [ButtonActive]);

  return (
    <>
      {AllRank.length > 0 && (
        <>
          <h3 style={{ marginTop: '10px', marginBottom: '20px' }}>
            인기 애니 TOP10
          </h3>
          <AniRankingButton
            setActiveItemIndex={setActiveItemIndex}
            setButtonActive={setButtonActive}
            ButtonActive={ButtonActive}
          ></AniRankingButton>
          {/*애니 랭킹 버튼 컴포넌트*/}

          <AniItemsCarousel
            AllAniData={AllRank}
            setActiveItemIndex={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            RankAniItem={true}
          ></AniItemsCarousel>
          {/*애니 슬라이드 컴포넌트*/}
        </>
      )}
    </>
  );
};

export default AniRanking;
