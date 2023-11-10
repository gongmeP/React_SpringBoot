import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import AniItem from '../../components/AniItem';
import { setAni, setAniEA, setSearchAni } from '../../Redux/action';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import axios from 'axios';

function AllList() {
  const Anidata = useSelector((state) => state.Ani);
  // const searchAni = useSelector((state) => state.searchAni);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/Ani/ALL`);
      store.dispatch(setAni(res.data));
      // store.dispatch(setSearchAni(res.data));
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
    // store.dispatch(setSearchAni(res2.data));
    store.dispatch(setAni(res2.data));
  };

  const ResetButton = () => {
    setSearchText('');
  };

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col md={8}>
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
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        <Col md={2}>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
          <Button variant="outline-secondary" onClick={ResetButton}>
            초기화
          </Button>
        </Col>
        <Col md={10}>
          {Anidata.map((ani) => (
            <AniItem key={ani.id} Anidata={ani} />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default AllList;
