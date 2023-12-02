import { Row } from 'react-bootstrap';
import AniMainDaily from '../../components/AniComponents/AniMainDaily';
import AniRanking from '../../components/AniComponents/AniRanking';
import Banner from '../../components/AniComponents/Banner';
import UserViewList from '../../components/AniComponents/UserViewList';
import AniRecommend from '../../components/GptComponents/AniRecommend';
import React from 'react';

const Home: React.FC = () => {
  const userid = window.sessionStorage.getItem('loginID');
  return (
    <>
      <Row>
        <Banner></Banner>
        {userid !== null ? <UserViewList></UserViewList> : null}
        <AniMainDaily></AniMainDaily>
        <AniRanking></AniRanking>
        <AniRecommend></AniRecommend>
      </Row>
    </>
  );
};

export default Home;
