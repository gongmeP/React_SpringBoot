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

import { useSelector } from 'react-redux';
import {
  SetUserArray,
  SetUserArrayEA,
  SetUserSearchTF,
} from '../../Redux/UserAcrion';

function UserSearch() {
  const SearchPages = useSelector((store) => store.userState.UserSearchPage);
  const PageSize = useSelector((state) => state.userState.UserPageSize);
  const [searchText, setSearchText] = useState('');
  const searchTF = useSelector((store) => store.userState.UserSearchTF);
  const [render, setRender] = useState(false);

  console.log(searchText);
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
      `http://localhost:8080/Memberlist/IdSearch?mid=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
    );

    console.log(res.data);
    store.dispatch(SetUserArray(res.data.member.content));
    store.dispatch(SetUserArrayEA(res.data.totalPage));
    store.dispatch(SetUserSearchTF('Search'));
  };

  useEffect(() => {
    if (!render) {
      setRender(true);
      return;
    }
    const SearchPage = async () => {
      const res = await axios.get(
        `http://localhost:8080/Memberlist/IdSearch?mid=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
      );

      store.dispatch(SetUserArray(res.data.member.content));
      store.dispatch(SetUserArrayEA(res.data.totalPage));
      store.dispatch(SetUserSearchTF('Search'));
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

export default UserSearch;
