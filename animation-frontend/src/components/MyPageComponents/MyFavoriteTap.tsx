import React from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import { H2styled } from 'src/styledcomponents/AniList.styled';
import FavoriteItem from './FavoriteItem';
import { AnidataTs } from 'src/model/Animation';

interface MyFavoriteTapProp {
  AllRank: AnidataTs[];
  FavoriteList: AnidataTs[];
}

const MyFavoriteTap = ({ AllRank, FavoriteList }: MyFavoriteTapProp) => {
  return (
    <>
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
    </>
  );
};

export default MyFavoriteTap;
