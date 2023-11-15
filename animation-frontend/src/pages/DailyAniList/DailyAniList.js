import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import DailyItem from '../../components/DailyAniListComponents/DailyItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from '../../Redux/store';
import { setAniALLArray } from '../../Redux/AniAction';

function DailyAniList() {
  const AniALLArray = useSelector((state) => state.AniState.AniALLArray);
  const [Daily, setDaily] = useState([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ]);
  const [Day, setDay] = useState('월');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/Ani/DayOfWeek',
          Day,
          {
            headers: {
              'Content-Type': 'text/plain',
            },
          },
        );
        store.dispatch(setAniALLArray(res.data));
      } catch (error) {
        console.log('AniMainDaily AxiosError');
      }
    };
    fetchData();
  }, [Day]);

  const DayChange = (day) => {
    setDay(day);
  };
  const navigate = useNavigate();
  const AniDetailGo = (id) => {
    navigate('/Ani/' + id);
  };
  return (
    <>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        {Daily.map((day) => (
          <DailyItem day={day}></DailyItem>
        ))}
      </Row>
      <Row className="d-block d-lg-none">
        <Col className="DailyCol">
          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('월')}
          >
            월
          </Button>
          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('화')}
          >
            화
          </Button>

          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('수')}
          >
            수
          </Button>

          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('목')}
          >
            목
          </Button>

          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('금')}
          >
            금
          </Button>

          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('토')}
          >
            토
          </Button>

          <Button
            variant="secondary"
            className="secondary2"
            onClick={() => DayChange('일')}
          >
            일
          </Button>
        </Col>
      </Row>
      <Row className="d-block d-lg-none d-flex">
        {AniALLArray.map((AniALLArray) => (
          <Col key={AniALLArray.id} className="p-1" md={3} sm={4} xs={4}>
            <AniImg
              onClick={() => AniDetailGo(AniALLArray.id)}
              src={`http://localhost:8080/file/AniImgFile/${AniALLArray.photo}`}
              alt={AniALLArray.photo}
            ></AniImg>
            <div className="CardTitle" style={{ fontSize: '0.95rem' }}>
              {AniALLArray.title}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
const AniImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
`;

export default DailyAniList;
