import { Row } from 'react-bootstrap';
import AniMainDaily from '../../components/AniComponents/AniMainDaily';
import AniRanking from '../../components/AniComponents/AniRanking';
import Banner from '../../components/AniComponents/Banner';
import UserViewList from '../../components/AniComponents/UserViewList';

function Home() {
  return (
    <>
      <Row>
        <Banner></Banner>
        <UserViewList></UserViewList>
        <AniMainDaily></AniMainDaily>
        <AniRanking></AniRanking>
      </Row>
    </>
  );
}

export default Home;
