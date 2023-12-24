import React, { useEffect, useState } from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import Genrefilter from '../../components/AniComponents/Genrefilter';
import Search from '../../components/AniComponents/Search';
import AniItem from '../../components/AniComponents/AniItem';
import axiosAPI from '../../axiosAPI';
import LoadingSpinner from '../../components/MainComponents/LodingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import { AnidataTs } from 'src/model/Animation';
import { AxiosResponse } from 'axios';
import OrderBy from 'src/components/AniComponents/OrderBy';
import Smallfillter from 'src/components/AniComponents/SmallFillter';
import { H2styled } from 'src/styledcomponents/AniList.styled';

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
          res = await axiosAPI.get(
            `/Ani/ALLOderByConter?page=${AniPage}&admin=no`,
          );
        } else {
          res = await axiosAPI.get(`/Ani/ALL?page=${AniPage}&admin=no`);
        }

        setAnidata(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [OderByAniCounter, ReuseEffect]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function ScrollBottom() {
      const pixelRatio: number = +(window.devicePixelRatio || 1).toFixed(2);

      const windowHeight = Math.round(window.innerHeight * pixelRatio);
      const documentHeight = Math.round(
        document.documentElement.scrollHeight * pixelRatio - 1,
      );
      const scrollTop = Math.round(
        (window.scrollY || document.documentElement.scrollTop) * pixelRatio,
      );

      // 화면 맨 아래에 도달했는지 여부 확인
      if (windowHeight + scrollTop >= documentHeight) {
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
            res = await axiosAPI.get(
              `/Ani/ALLOderByConter?page=${AniPage}&admin=no`,
            );
          } else {
            res = await axiosAPI.get(`/Ani/ALL?page=${AniPage}&admin=no`);
          }
          // console.log(res.data);
          setAnidata((Anidata) => [...Anidata, ...res.data]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [AniPage]);

  return (
    <>
      <Search setAnidata={setAnidata} />
      {/*검색 컴포넌트 */}
      <OrderBy
        setOderByAniCounter={setOderByAniCounter}
        setPage={setPage}
        OderByAniCounter={OderByAniCounter}
      />
      {/*인기순 컴포넌트 */}
      <Smallfillter
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        setAnidata={setAnidata}
        setPage={setPage}
      />
      {/*모바일 디바이스 필터 컴포넌트 */}

      <Row style={{ margin: '10px auto' }}>
        <Col md={2} sm={2} className="d-none d-sm-block">
          <Genrefilter setAnidata={setAnidata} setPage={setPage}></Genrefilter>
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

export default AllList;
