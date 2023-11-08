import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import AniItem from '../../components/AniItem';
import Page from '../../components/Page';
import { setAni, setAniEA } from '../../Redux/action';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';

function AllList() {
  const Ani1Page = useSelector((state) => state.Ani);
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
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {Ani1Page.map((Ani1Page) => (
          <AniItem key={Ani1Page.id} Ani={Ani1Page} />
        ))}
      </Row>
      <Page EA={AniEA} Pages={Pages}></Page>
    </>
  );
}

export default AllList;
