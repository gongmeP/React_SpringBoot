import React, { useEffect, useState } from 'react';
import BookItem from '../../components/AniItem';
import { Row } from 'react-bootstrap';
import Page from '../../components/Page';
import Banner from '../../components/Banner';
import MainDaily from '../../components/MainDaily';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setAni, setAniEA } from '../../Redux/action';
import store from '../../Redux/store';
import AniItem from '../../components/AniItem';

function Home() {
  const Ani = useSelector((state) => state.Ani);
  const Pages = useSelector((state) => state.pages);
  const AniEA = useSelector((stage) => stage.AniEA);

  useEffect(() => {
    fetch(`http://localhost:8080/Ani?page=${Pages}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);

        store.dispatch(setAni(res.content));
        store.dispatch(setAniEA(res.totalElements));
      });
  }, [Pages]);
  return (
    <>
      <Banner></Banner>
      <MainDaily></MainDaily>
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {Ani.map((Ani) => (
          <AniItem key={Ani.id} Ani={Ani} />
        ))}
      </Row>
      <Page EA={AniEA} Pages={Pages}></Page>
    </>
  );
}

export default Home;
