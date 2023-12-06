import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosAPI, { API_URL } from '../../axiosAPI';
import store from '../../Redux/store';
import { setUserViewTatle } from '../../Redux/AniAction';
import { AnidataTs, UserViewAnidataTs } from 'src/model/Animation';
import AniItemsCarousel from './AniItemsCarousel';

const UserViewList = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const userid: string | null = window.sessionStorage.getItem('loginID');
  const [AllRank, setAllRank] = useState<UserViewAnidataTs[]>([]);

  useEffect(() => {
    if (userid !== null) {
      const UserViewList = async () => {
        const res = await axiosAPI.get(
          `/ViewList/UserViewList?userid=${userid}`,
        );
        if (res.data === '시청데이터 없음') {
          setAllRank([]);
        } else {
          setAllRank(res.data);
          store.dispatch(
            setUserViewTatle(
              res.data.map((data: UserViewAnidataTs) => data.title),
            ),
          );
        }
      };
      UserViewList();
    }
  }, []);

  return (
    <>
      {AllRank.length > 0 ? (
        <>
          <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>
            최근본 작품
          </h3>
          <AniItemsCarousel
            AllAniData={AllRank}
            setActiveItemIndex={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            RankAniItem={false}
          ></AniItemsCarousel>
        </>
      ) : null}
    </>
  );
};

export default UserViewList;
