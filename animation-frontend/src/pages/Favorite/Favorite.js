import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import store from '../../Redux/store';
import { setFavoriteList } from '../../Redux/FavoriteAction';
import FavoriteItem from '../../components/FavoriteComponents/FavoriteItem';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';

function Favorite() {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('loginID');
  const FavoriteList = useSelector((state) => state.FavoriteState.FavoriteList);

  useEffect(() => {
    const checkLogin = async () => {
      if (!userid) {
        alert('로그인 후 이용해주세요.');
        navigate('/loginForm');
      }
    };
    checkLogin();
  }, [userid, navigate]);

  const [AllRank, setAllRank] = useState([]);
  useEffect(() => {
    if (userid !== null) {
      const UserViewList = async () => {
        const res = await axiosAPI.get(
          `/ViewList/UserViewList?userid=${userid}`,
        );
        setAllRank(res.data);
      };
      UserViewList();
    }
  }, []);

  useEffect(() => {
    const FavoriteData = async () => {
      const res = await axiosAPI.get(`/FavoriteList?userid=${userid}`);
      store.dispatch(setFavoriteList(res.data));
    };
    FavoriteData();
  }, []);

  return (
    <>
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
    </>
  );
}
const H2styled = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

export default Favorite;
