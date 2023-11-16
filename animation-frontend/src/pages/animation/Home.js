import { Row } from 'react-bootstrap';
import AniMainDaily from '../../components/AniComponents/AniMainDaily';
import AniRanking from '../../components/AniComponents/AniRanking';
import Banner from '../../components/AniComponents/Banner';
import UserViewList from '../../components/AniComponents/UserViewList';

function Home() {
  const userid = window.sessionStorage.getItem('loginID');
  console.log(userid);
  return (
    <>
      <Row>
        <Banner></Banner>
        {userid !== null ? <UserViewList></UserViewList> : null}
        <AniMainDaily></AniMainDaily>
        <AniRanking></AniRanking>
      </Row>
    </>
  );
}

export default Home;
