import React from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import Genrefilter from './Genrefilter';
import { AnidataTs } from 'src/model/Animation';

interface SmallfillterOwnprops {
  setShowMenu: (showMenu: boolean) => void;
  setAnidata: (Anidata: AnidataTs[]) => void;
  showMenu: boolean;
  setPage: (page: number) => void;
}

const Smallfillter = ({
  setShowMenu,
  showMenu,
  setAnidata,
  setPage,
}: SmallfillterOwnprops) => {
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  return (
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
            ></Genrefilter>
          </Offcanvas.Body>
        </Offcanvas>
      </Col>
    </Row>
  );
};

export default Smallfillter;
