import { Row } from 'react-bootstrap';
import AniMainDaily from '../../components/AniComponents/AniMainDaily';
import AniRanking from '../../components/AniComponents/AniRanking';
import Banner from '../../components/AniComponents/Banner';

function Home() {
  return (
    <>
      <Row>
        <Banner></Banner>
        <AniMainDaily></AniMainDaily>
        <AniRanking></AniRanking>
      </Row>
    </>
  );
}

export default Home;
