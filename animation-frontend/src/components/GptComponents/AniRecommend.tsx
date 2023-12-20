import React, { useState } from 'react';

import axiosAPI from '../../axiosAPI';
import { Col, Row } from 'react-bootstrap';
import {
  GptNoDiv,
  ReComButton,
  ReComButton2,
  RecomButtonBox,
  RecomDiv,
} from '../../styledcomponents/AniRecommend.styled';
import { useSelector } from 'react-redux';
import LoadingSpinner2 from '../MainComponents/LodingSpinner2';
import { RootState } from 'src/Redux/store';
import { GenreArray } from 'src/model/Animation';

const AniRecommend = () => {
  const genreArray: GenreArray = useSelector(
    (state: RootState) => state.AniState.genreArray,
  );
  const [loding, setLoding] = useState<boolean>();

  const [GptGetText, setGptGetText] = useState<string>('');
  const [UserText, setUsetText] = useState<string>('직접입력');
  const [UserEditTF, setUserEditTF] = useState<boolean>(false);

  const UserEdit = () => {
    setUsetText('');
    setUserEditTF(true);
  };
  const textgo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsetText(e.target.value);
  };
  const GptReCommendgo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoding(true);
      try {
        const res = await axiosAPI.post(
          `/AniRecommend`,
          {
            prompt: UserText,
          },
          { timeout: 20000 },
        );
        setGptGetText(res.data.body.choices[0].text);
      } catch (error) {
        alert('잠시 후 다시 이용해주세요.');
      } finally {
        setLoding(false);
      }
    }
  };

  const GptRecommend = async (data: string) => {
    setLoding(true);
    try {
      const res = await axiosAPI.post(
        `/AniRecommend`,
        {
          prompt: data,
        },
        { timeout: 20000 },
      );
      setGptGetText(res.data.body.choices[0].text);
    } catch (error) {
      alert('잠시 후 다시 이용해주세요.');
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      <h3 style={{ marginTop: '20px' }}>오늘 뭐봄? 애니추천 받기!</h3>
      <Row>
        <Col md={5}>
          <RecomDiv>추천받고 싶은 애니 장르를 선택해보세요!</RecomDiv>
          <RecomButtonBox>
            {genreArray.genre.map((data, index) => (
              <ReComButton key={index} onClick={() => GptRecommend(data)}>
                {data}
              </ReComButton>
            ))}
            <ReComButton2 onClick={UserEdit}>
              {UserEditTF ? (
                <input
                  type="text"
                  defaultValue={UserText}
                  onChange={textgo}
                  onKeyDown={GptReCommendgo}
                />
              ) : (
                <span>{UserText}</span>
              )}
            </ReComButton2>
          </RecomButtonBox>
        </Col>
        <Col md={7}>
          <RecomDiv>선택한 장르의 추천은 ? 이거 !</RecomDiv>
          {loding ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <LoadingSpinner2></LoadingSpinner2>
            </div>
          ) : (
            <RecomButtonBox style={{ whiteSpace: 'pre-line' }}>
              {GptGetText === '' ? (
                <GptNoDiv>
                  현재 추천받은 애니메이션이 없어요..
                  <br></br> 애니메이션 추천을 받아보세요!
                </GptNoDiv>
              ) : (
                <div>{GptGetText.trim()}</div>
              )}
            </RecomButtonBox>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AniRecommend;
