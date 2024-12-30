import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import { setFavoriteList } from '../../Redux/FavoriteAction';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import MypageInfo from '../../components/MyPageComponents/MypageInfo';
import { AnidataTs } from 'src/model/Animation';
import { AxiosResponse } from 'axios';
import MyFavoriteTap from 'src/components/MyPageComponents/MyFavoriteTap';

const Mypage = () => {
  const navigate = useNavigate();
  const userid: string | null = sessionStorage.getItem('loginID');
  const FavoriteList: AnidataTs[] = useSelector(
    (state: RootState) => state.FavoriteState.FavoriteList,
  );
  useEffect(() => {
    const checkLogin = async () => {
      if (!userid) {
        alert('로그인 후 이용해주세요.');
        navigate('/loginForm');
      }
    };
    checkLogin();
  }, [userid, navigate]);

  const [AllRank, setAllRank] = useState<AnidataTs[]>([]);
  useEffect(() => {
    if (userid !== null) {
      const UserViewList = async () => {
        const res: AxiosResponse<AnidataTs[]> = await axiosAPI.get(
          `/ViewList/UserViewList?userid=${userid}`,
        );
        setAllRank(res.data);
      };
      UserViewList();
    }
  }, []);

  useEffect(() => {
    const FavoriteData = async () => {
      const res: AxiosResponse<AnidataTs> = await axiosAPI.get(
        `/FavoriteList?userid=${userid}`,
      );
      store.dispatch(setFavoriteList(res.data));
    };
    FavoriteData();
  }, []);

  return (
    <>
      <Row>
        <Col md={3}>
          <MypageInfo></MypageInfo> {/* 회원정보 출력 컴포넌트 */}
        </Col>
        <Col md={9}>
          {AllRank && (
            <MyFavoriteTap AllRank={AllRank} FavoriteList={FavoriteList} />
          )}
          {/* 회원 보관함 리스트 컴포넌트 */}
        </Col>
      </Row>
    </>
  );
};

export default Mypage;
