import axios from 'axios';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import store from '../../Redux/store';
import { setAni } from '../../Redux/action';

function Favorite() {
  //   const userid = sessionStorage.getItem('loginID');
  //   console.log(userid);
  useEffect(() => {
    const FavoriteData = async () => {
      const res = await axios.get(
        `http://localhost:8080/FavoriteList?userid=${sessionStorage.getItem(
          'loginID',
        )}`,
      );
      console.log(res.data);
    };
    FavoriteData();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="보관함"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="보관함" title="보관함 목록">
          Tab content for Home
        </Tab>
        <Tab eventKey="최근본 목록" title="최근본 목록">
          Tab content for Profile
        </Tab>
      </Tabs>
    </>
  );
}

export default Favorite;
