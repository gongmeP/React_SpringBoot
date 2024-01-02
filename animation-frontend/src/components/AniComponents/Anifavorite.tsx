import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAPI from 'src/axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import FavoriteButton from './FavoriteButton';

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
          <FavoriteButton
            imgname={'../projectimg/button/play.png'}
            onClick={Playvideo}
            text={'재생하기'}
          />
          {favoriteOK === '보관함 있음' ? (
            <>
              <FavoriteButton
                imgname={'../projectimg/button/minus.png'}
                onClick={favoriteDelete}
                text={'보관함 제거'}
              />
            </>
          ) : (
            <>
              <FavoriteButton
                imgname={'../projectimg/button/plus.png'}
                onClick={favorite}
                text={'보관함 추가'}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Anifavorite;
