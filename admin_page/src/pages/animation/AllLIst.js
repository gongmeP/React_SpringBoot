import React, { useEffect, useState } from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import AniItem from '../../components/AniComponents/AniItem';
import { setAni } from '../../Redux/AniAction';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import axios from 'axios';
import Genrefilter from '../../components/AniComponents/Genrefilter';
import Search from '../../components/AniComponents/Search';
import styled from 'styled-components';
import axiosAPI from '../../axiosAPI';
import LoadingSpinner from '../../components/MainComponents/LodingSpinner';

function AllList() {
  const Anidata = useSelector((state) => state.AniState.Ani);
  const [loading, setLoading] = useState(true);

  const [reEffect, setReEffect] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosAPI.get(`/Ani/ALL`);
        store.dispatch(setAni(res.data));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, [reEffect]);

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
        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Col md={10} sm={10} xs={12} className="p-0 anicardCol">
            {Anidata.length <= 0 ? (
              <H2styled>검색하신 결과가 없어요.</H2styled>
            ) : (
              Anidata.map((ani) => (
                <AniItem
                  key={ani.id}
                  Anidata={ani}
                  reEffect={reEffect}
                  setReEffect={setReEffect}
                />
              ))
            )}
          </Col>
        )}
      </Row>
    </>
  );
}

const H2styled = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

export default AllList;
