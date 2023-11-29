import React, { useState } from 'react';
import {
  ReviewText,
  ReviewTextBoxDiv,
  ReviewTextButton,
} from '../../styledcomponents/AniReview.styled';
import axiosAPI from '../../axiosAPI';
import { Button } from 'react-bootstrap';

function AniRecommend() {
  const [GptText, setGptText] = useState('코바야시네 메이드래곤');
  const GptTextIn = (e) => {
    setGptText(e.target.value);
  };

  const GptRecommend = async () => {
    const res = await axiosAPI.post(
      `/AniRecommend`,
      {
        prompt: GptText,
      },
      { timeout: 10000 },
    );
    console.log(res.data.body.choices[0].text);
  };

  return (
    <>
      <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>
        오늘 뭐봄? 애니추천 받기!
      </h3>
      <ReviewTextBoxDiv>
        <Button onClick={GptRecommend}>{GptText}</Button>
      </ReviewTextBoxDiv>
    </>
  );
}

export default AniRecommend;
