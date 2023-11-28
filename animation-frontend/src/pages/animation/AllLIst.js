import React, { useEffect, useState } from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import Genrefilter from '../../components/AniComponents/Genrefilter';
import Search from '../../components/AniComponents/Search';
import styled from 'styled-components';
import AniItem from '../../components/AniComponents/AniItem';
import axiosAPI from '../../axiosAPI';
import LoadingSpinner from '../../components/MainComponents/LodingSpinner';
import { NewAndRankingDiv } from '../../styledcomponents/AniList.styled';
import { AniOderBy } from '../../styledcomponents/AniReview.styled';
import { useSelector } from 'react-redux';

function AllList() {
  const [loading, setLoading] = useState(true);
  const [Anidata, setAnidata] = useState([]);
  const [OderByAniCounter, setOderByAniCounter] = useState(true);
  const ReuseEffect = useSelector((state) => state.AniState.ReuseEffect);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        console.log(OderByAniCounter);
        if (OderByAniCounter) {
          res = await axiosAPI.get(`/Ani/ALLOderByConter`);
        } else {
          res = await axiosAPI.get(`/Ani/ALL`);
        }
        setAnidata(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [OderByAniCounter, ReuseEffect]);

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <>
      <Search></Search> {/*검색 컴포넌트 여기 */}
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        {!OderByAniCounter ? (
          <NewAndRankingDiv
            onClick={() =>
              setOderByAniCounter((OderByAniCounter) => !OderByAniCounter)
            }
          >
            최신순
            <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
          </NewAndRankingDiv>
        ) : (
          <NewAndRankingDiv
            onClick={() =>
              setOderByAniCounter((OderByAniCounter) => !OderByAniCounter)
            }
          >
            인기순
            <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
          </NewAndRankingDiv>
        )}
      </div>
      <Row>
        <Col xs={12} className="d-block d-sm-none">
          <Button
            variant="outline-secondary"
            onClick={handleMenuToggle}
            style={{ float: 'right', marginRight: '20px' }}
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
              <Genrefilter setAnidata={setAnidata}></Genrefilter>{' '}
              {/*필터 컴포넌트 여기 */}
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        <Col md={2} sm={2} className="d-none d-sm-block">
          <Genrefilter setAnidata={setAnidata}></Genrefilter>{' '}
          {/*필터 컴포넌트 여기 */}
        </Col>

        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Col md={10} sm={10} xs={12} className="p-0 anicardCol">
            {Anidata.length <= 0 ? (
              <H2styled>검색하신 결과가 없어요.</H2styled>
            ) : (
              Anidata.map((ani) => <AniItem key={ani.id} Anidata={ani} />)
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
