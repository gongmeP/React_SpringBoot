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
import '../../styledcomponents/BootStrapcss.css';
import { AnidataTs } from 'src/model/Animation';
import { RootState } from 'src/Redux/store';
import { AxiosResponse } from 'axios';

function AllList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [Anidata, setAnidata] = useState<AnidataTs[]>([]);
  const [OderByAniCounter, setOderByAniCounter] = useState<boolean>(true);
  const ReuseEffect: number = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );
  const [AniPage, setPage] = useState<number>(0);
  const [AniMore, setAniMore] = useState<boolean>(true);
  const filterTF = useSelector((state: RootState) => state.AniState.filterTF);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res: AxiosResponse<AnidataTs[]>;
        if (OderByAniCounter) {
          res = await axiosAPI.get(`/Ani/ALLOderByConter?page=${AniPage}`);
        } else {
          res = await axiosAPI.get(`/Ani/ALL?page=${AniPage}`);
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

  useEffect(() => {
    function ScrollBottom() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // 화면 맨 아래에 도달했는지 여부 확인
      if (windowHeight + scrollTop === documentHeight) {
        setAniMore(true);
        if (AniMore && !filterTF) {
          setPage((AniPage) => AniPage + 1);
        }
      } else {
        setAniMore(false);
      }
    }
    window.addEventListener('scroll', ScrollBottom);
    return () => {
      window.removeEventListener('scroll', ScrollBottom);
    };
  }, []);

  useEffect(() => {
    if (AniPage > 0 && !filterTF) {
      const fetchData = async () => {
        try {
          let res: AxiosResponse<AnidataTs[]>;
          if (OderByAniCounter) {
            res = await axiosAPI.get(`/Ani/ALLOderByConter?page=${AniPage}`);
          } else {
            res = await axiosAPI.get(`/Ani/ALL?page=${AniPage}`);
          }

          setAnidata((Anidata) => [...Anidata, ...res.data]);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [AniPage]);

  return (
    <>
      <Search setAnidata={setAnidata}></Search> {/*검색 컴포넌트 여기 */}
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        {!OderByAniCounter ? (
          <NewAndRankingDiv
            onClick={() =>
              setOderByAniCounter((OderByAniCounter) => {
                setPage(0);
                return !OderByAniCounter;
              })
            }
          >
            최신순
            <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
          </NewAndRankingDiv>
        ) : (
          <NewAndRankingDiv
            onClick={() =>
              setOderByAniCounter((OderByAniCounter) => {
                setPage(0);
                return !OderByAniCounter;
              })
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
              <Genrefilter
                setAnidata={setAnidata}
                setPage={setPage}
              ></Genrefilter>{' '}
              {/*필터 컴포넌트 여기 */}
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <Row style={{ margin: '10px auto' }}>
        <Col md={2} sm={2} className="d-none d-sm-block">
          <Genrefilter setAnidata={setAnidata} setPage={setPage}></Genrefilter>{' '}
          {/*필터 컴포넌트 여기 */}
        </Col>

        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Col md={10} sm={10} xs={12} className="p-0 anicardCol">
            {Anidata.length <= 0 ? (
              <H2styled>검색하신 결과가 없어요.</H2styled>
            ) : (
              Anidata.map((ani, index) => <AniItem key={index} Anidata={ani} />)
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
