import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AniImg } from '../../styledcomponents/AniDetail.styled';
import { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Button } from 'react-bootstrap';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import AniItemsCarousel from './AniItemsCarousel';

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

  const RangkingDataOn = (day: string) => {
    setActiveItemIndex(0);
    setButtonActive(day);
  };

  return (
    <>
      {AllRank.length > 0 && (
        <>
          <h3 style={{ marginTop: '10px', marginBottom: '20px' }}>
            인기 애니 TOP10
          </h3>
          <div>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'today' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('today')}
            >
              일간
            </Button>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'thisWeek' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('thisWeek')}
            >
              주간
            </Button>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'allTime' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('allTime')}
            >
              역대
            </Button>
          </div>

          <AniItemsCarousel
            AllAniData={AllRank}
            setActiveItemIndex={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            RankAniItem={true}
          ></AniItemsCarousel>
        </>
      )}
    </>
  );
};

export default AniRanking;
