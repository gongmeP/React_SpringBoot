import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAPI from 'src/axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import {
  PlayDiv_Styled,
  PlayImg_Styled,
} from 'src/styledcomponents/AniDetail.styled';

interface AnifavoriteOwnprops {
  detailAni: AnidataTs;
  id: string | undefined;
  favoriteOK: string;
  setFavoriteOK: (favoriteOK: string) => void;
  Loading: boolean;
}

const Anifavorite = ({
  detailAni,
  id,
  setFavoriteOK,
  favoriteOK,
  Loading,
}: AnifavoriteOwnprops) => {
  const userid = sessionStorage.getItem('loginID');
  const navigate = useNavigate();

  const Playvideo = async () => {
    if (detailAni !== null) {
      if (!window.sessionStorage.getItem('loginID')) {
        alert('로그인 후 서비스 이용이 가능해요.');
        navigate('/loginForm');
        return;
      }
      try {
        const res = await axiosAPI.put(`/Ani/ViewCounter/${id}`);
        const res2 = await axiosAPI.post(`/ViewList`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });
        window.open('https://laftel.net/', '_blank');
      } catch (error) {
        console.error('ViewCounter axios Error');
      }
    }
  };

  const favoriteDelete = async () => {
    if (detailAni !== null) {
      try {
        const res = await axiosAPI.post(`/Favorite/Delete`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });

        const res2 = await axiosAPI.post(`/Favorite/Check`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });
        setFavoriteOK(res2.data);
        alert('보관함에서 제거되었습니다.');
      } catch (error) {
        console.error('Detail axios Error');
      }
    }
  };

  const favorite = async () => {
    if (detailAni !== null) {
      if (!window.sessionStorage.getItem('loginID')) {
        alert('로그인 후 보관함 사용이 가능해요.');
        navigate('/loginForm');
        return;
      }
      try {
        const res = await axiosAPI.post(`/Favorite`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });

        const res2 = await axiosAPI.post(`/Favorite/Check`, {
          Ani_id: detailAni.id,
          member_mid: userid,
        });
        setFavoriteOK(res2.data);
        alert('보관함에 추가되었어요!!');
      } catch (error) {
        console.error('Detail axios Error');
      }
    }
  };

  return (
    <>
      {!Loading && favoriteOK && (
        <>
          <PlayImg_Styled
            src="../projectimg/button/play.png"
            onClick={Playvideo}
          />
          <PlayDiv_Styled onClick={Playvideo}>재생하기</PlayDiv_Styled>
          {favoriteOK === '보관함 있음' ? (
            <>
              <PlayImg_Styled
                src="../projectimg/button/minus.png"
                onClick={favoriteDelete}
              />
              <PlayDiv_Styled onClick={favoriteDelete}>
                보관함 제거
              </PlayDiv_Styled>
            </>
          ) : (
            <>
              <PlayImg_Styled
                src="../projectimg/button/plus.png"
                onClick={favorite}
              />
              <PlayDiv_Styled onClick={favorite}>보관함 추가</PlayDiv_Styled>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Anifavorite;
