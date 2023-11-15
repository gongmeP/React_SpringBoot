import axios from 'axios';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import store from '../../Redux/store';
import { setFavoriteList } from '../../Redux/FavoriteAction';
import FavoriteItem from '../../components/FavoriteComponents/FavoriteItem';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Favorite() {
  const navigate = useNavigate();
  const loginID = sessionStorage.getItem('loginID');
  const FavoriteList = useSelector((state) => state.FavoriteState.FavoriteList);

  useEffect(() => {
    const checkLogin = async () => {
      if (!loginID) {
        alert('로그인 후 이용해주세요.');
        navigate('/loginForm');
      }
    };
    checkLogin();
  }, [loginID, navigate]);

  useEffect(() => {
    const FavoriteData = async () => {
      const res = await axios.get(
        `http://localhost:8080/FavoriteList?userid=${sessionStorage.getItem(
          'loginID',
        )}`,
      );
      store.dispatch(setFavoriteList(res.data));
    };
    FavoriteData();
  }, []);

  return (
    <>
      {loginID ? (
        <Tabs
          defaultActiveKey="보관함"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="보관함" title="보관함 목록">
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
          </Tab>
          <Tab eventKey="최근본 목록" title="최근본 목록">
            Tab content for Profile
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
