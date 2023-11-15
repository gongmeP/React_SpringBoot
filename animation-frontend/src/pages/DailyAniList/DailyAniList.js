import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import DailyItem from '../../components/DailyAniListComponents/DailyItem';

function DailyAniList() {
  const [Daily, setDaily] = useState([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ]);

  return (
    <>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        {Daily.map((day) => (
          <DailyItem day={day}></DailyItem>
        ))}
      </Row>
    </>
  );
}

export default DailyAniList;
