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
import AniItem from '../../components/AniItem';
import { setAni } from '../../Redux/action';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import axios from 'axios';

function AllList() {
  const Anidata = useSelector((state) => state.Ani);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/Ani/ALL`);
      store.dispatch(setAni(res.data));
    };
    fetchData();
  }, []);

  const [searchText, setSearchText] = useState('');
  console.log(searchText);

  const Search = async (e) => {
    e.preventDefault();

    const res2 = await axios.get(
      `http://localhost:8080/Ani/search?title=${searchText}`,
    );

    store.dispatch(setAni(res2.data));
  };

  const ResetButton = () => {
    setSearchText('');
  };

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <>
      <Row>
        <Col md={3} sm={3} xs={1}></Col>
        <Col md={8} sm={8} xs={10}>
          <Form onSubmit={Search}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="검색어를 입력하세요"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <Button variant="outline-secondary" type="submit">
                검색
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
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
              <Button variant="outline-secondary" onClick={ResetButton}>
                초기화
              </Button>
              <Form.Check type="checkbox" id="genre1" label="장르1" />
              <Form.Check type="checkbox" id="genre2" label="장르2" />
              <Form.Check type="checkbox" id="genre3" label="장르3" />
              <Form.Check type="checkbox" id="genre4" label="장르4" />
              <Form.Check type="checkbox" id="genre5" label="장르5" />
              <Form.Check type="checkbox" id="genre6" label="장르6" />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        <Col md={2} sm={2} className="d-none d-sm-block">
          <Button variant="outline-secondary" onClick={ResetButton}>
            초기화
          </Button>
          <div>
            <Form.Check type="checkbox" id="genre1" label="장르1" />
          </div>
          <div>
            <Form.Check type="checkbox" id="genre2" label="장르2" />
          </div>
          <div>
            <Form.Check type="checkbox" id="genre3" label="장르3" />
          </div>
          <div>
            <Form.Check type="checkbox" id="genre4" label="장르4" />
          </div>
          <div>
            <Form.Check type="checkbox" id="genre5" label="장르5" />
          </div>
          <div>
            <Form.Check type="checkbox" id="genre6" label="장르6" />
          </div>
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
