import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface AniRankingButtonProp {
  setActiveItemIndex: (activeItemIndex: number) => void;
  setButtonActive: (ButtonActive: string) => void;
  ButtonActive: string;
}

const AniRankingButton = ({
  setActiveItemIndex,
  ButtonActive,
  setButtonActive,
}: AniRankingButtonProp) => {
  const RangkingDataOn = (day: string) => {
    setActiveItemIndex(0);
    setButtonActive(day);
  };
  return (
    <>
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
    </>
  );
};

export default AniRankingButton;
