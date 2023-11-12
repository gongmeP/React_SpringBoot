import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import store from '../../Redux/store';
import {
  setFreeBoards,
  setFreeBoardsEA,
  setSearchTF,
} from '../../Redux/action';
import { useSelector } from 'react-redux';

function BoradSerch() {
  const SearchPages = useSelector((store) => store.SearchPages);
  const [searchText, setSearchText] = useState('');
  const searchTF = useSelector((store) => store.searchTF);
  const [render, setRender] = useState(false);

  const SearchEnter = async (e) => {
    e.preventDefault();

    if (!searchText) {
      alert('검색어를 입력하세요.');
      return;
    }
    Search();
  };

  const Search = async () => {
    const res = await axios.get(
      `http://localhost:8080/FreeBoard/search?fbtitle=${searchText}&page=${SearchPages}`,
    );

    store.dispatch(setFreeBoards(res.data.freeBoard));
    store.dispatch(setFreeBoardsEA(res.data.totalPage));
    store.dispatch(setSearchTF('Search'));
  };

  useEffect(() => {
    if (!render) {
      setRender(true);
      return;
    }
    const SearchPage = async () => {
      const res = await axios.get(
        `http://localhost:8080/FreeBoard/search?fbtitle=${searchText}&page=${SearchPages}`,
      );

      store.dispatch(setFreeBoards(res.data.freeBoard));
      store.dispatch(setFreeBoardsEA(res.data.totalPage));
      store.dispatch(setSearchTF('Search'));
      // 검색이면 검색동작을 위해 Search 넣어준곳
    };
    SearchPage();
  }, [SearchPages]);
  return (
    <>
      <Row>
        <Col md={2} sm={2} xs={1}></Col>
        <Col md={8} sm={8} xs={10}>
          <Form onSubmit={SearchEnter}>
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
    </>
  );
}

export default BoradSerch;
