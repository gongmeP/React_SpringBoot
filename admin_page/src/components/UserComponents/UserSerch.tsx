import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';

import { useSelector } from 'react-redux';
import {
  SetUserArray,
  SetUserArrayEA,
  SetUserSearchTF,
} from '../../Redux/UserAcrion';
import axiosAPI from '../../axiosAPI';

const UserSearch = () => {
  const SearchPages = useSelector(
    (state: RootState) => state.userState.UserSearchPage,
  );
  const PageSize = useSelector(
    (state: RootState) => state.userState.UserPageSize,
  );
  const [searchText, setSearchText] = useState<string>('');
  const searchTF = useSelector(
    (state: RootState) => state.userState.UserSearchTF,
  );
  const [render, setRender] = useState<boolean>(false);
  const [select, setSelect] = useState<string>('아이디');

  const SearchEnter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) {
      alert('검색어를 입력하세요.');
      return;
    }
    Search();
  };

  const Search = async () => {
    let res;
    if (select === '아이디') {
      res = await axiosAPI.get(
        `/Memberlist/IdSearch?mid=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
      );
    } else if (select === '이름') {
      res = await axiosAPI.get(
        `/Memberlist/IdSearch?mname=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
      );
    } else {
      console.log('아이디 이름 셀렉트오류');
    }
    if (res !== undefined) {
      store.dispatch(SetUserArray(res.data.member.content));
      store.dispatch(SetUserArrayEA(res.data.totalPage));
      store.dispatch(SetUserSearchTF('Search'));
    }
  };

  useEffect(() => {
    if (!render) {
      setRender(true);
      return;
    }
    const SearchPage = async () => {
      let res;
      if (select === '아이디') {
        res = await axiosAPI.get(
          `/Memberlist/IdSearch?mid=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
        );
      } else if (select === '이름') {
        res = await axiosAPI.get(
          `/Memberlist/IdSearch?mname=${searchText}&page=${SearchPages}&pagesize=${PageSize}`,
        );
      } else {
        console.log('아이디 이름 셀렉트오류');
      }

      if (res !== undefined) {
        store.dispatch(SetUserArray(res.data.member.content));
        store.dispatch(SetUserArrayEA(res.data.totalPage));
        store.dispatch(SetUserSearchTF('Search'));
      }
    };
    SearchPage();
  }, [SearchPages]);

  const IdAndName = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  return (
    <>
      <Row>
        <Col md={1} sm={1} xs={1}></Col>
        <Col md={2} sm={3} xs={3}>
          <Form.Select onChange={IdAndName} defaultValue={'아이디'}>
            <option>아이디</option>
            <option>이름</option>
          </Form.Select>
        </Col>
        <Col md={7} sm={7} xs={7}>
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
};

export default UserSearch;
