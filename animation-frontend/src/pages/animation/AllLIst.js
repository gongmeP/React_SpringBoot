import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import AniItem from '../../components/AniComponents/AniItem';
import { setAni } from '../../Redux/action';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import axios from 'axios';
import Genrefilter from '../../components/AniComponents/Genrefilter';
import Search from '../../components/AniComponents/Search';

function AllList() {
  const Anidata = useSelector((state) => state.Ani);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/Ani/ALL`);
      store.dispatch(setAni(res.data));
    };
    fetchData();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <>
      <Search></Search> {/*검색 컴포넌트 여기 */}
      <Row>
        <Col xs={11} className="d-block d-sm-none">
          <Button
            variant="outline-secondary"
            onClick={handleMenuToggle}
            style={{ float: 'right' }}
          >
            태그 필터
          </Button>

          <Offcanvas
            show={showMenu}
            onHide={() => setShowMenu(false)}
            style={{ width: '200px' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>태그 필터</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Genrefilter></Genrefilter> {/*필터 컴포넌트 여기 */}
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        <Col md={2} sm={2} className="d-none d-sm-block">
          <Genrefilter></Genrefilter> {/*필터 컴포넌트 여기 */}
        </Col>
        <Col md={10} sm={10} xs={12}>
          {Anidata.map((ani) => (
            <AniItem key={ani.id} Anidata={ani} />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default AllList;
