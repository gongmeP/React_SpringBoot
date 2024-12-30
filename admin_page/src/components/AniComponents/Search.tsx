import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import axiosAPI from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';

interface ownProp {
  setAnidata: (Anidata: AnidataTs[]) => void;
}

const Search = ({ setAnidata }: ownProp) => {
  const [searchText, setSearchText] = useState('');
  const Search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    const res2 = await axiosAPI.get(
      `/Ani/search?title=${searchText}&admin=admin`,
    );
    setAnidata(res2.data);
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
    </>
  );
};

export default Search;
