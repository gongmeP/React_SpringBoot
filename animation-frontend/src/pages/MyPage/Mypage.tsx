import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import { setFavoriteList } from '../../Redux/FavoriteAction';
import FavoriteItem from '../../components/MyPageComponents/FavoriteItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { H2styled } from '../../styledcomponents/Favorite.styled';
import MypageInfo from '../../components/MyPageComponents/MypageInfo';
import { AnidataTs } from 'src/model/Animation';
import { AxiosResponse } from 'axios';

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
        <MypageInfo></MypageInfo> {/* 회원정보 출력하는곳 md={3} 설정*/}
        <Col md={9}>
          {AllRank ? (
            <Tabs
              defaultActiveKey="보관함"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="보관함" title="보관함 목록">
                <Row className="anicardCol">
                  {FavoriteList.length <= 0 ? (
                    <H2styled>보관함이 텅 비었어요.</H2styled>
                  ) : (
                    FavoriteList.map((FavoriteList) => (
                      <FavoriteItem
                        key={FavoriteList.id}
                        FavoriteList={FavoriteList}
                      />
                    ))
                  )}
                </Row>
              </Tab>
              <Tab eventKey="최근본 작품" title="최근본 작품">
                <Row className="anicardCol">
                  {AllRank.length <= 0 ? (
                    <H2styled>최근본 작품이 없어요.</H2styled>
                  ) : (
                    AllRank.map((AllRank) => (
                      <FavoriteItem key={AllRank.id} FavoriteList={AllRank} />
                    ))
                  )}
                </Row>
              </Tab>
            </Tabs>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default Mypage;
