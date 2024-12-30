import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import '../../styledcomponents/BootStrapcss.css';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../Redux/store';
import { setAniALLArray } from '../../Redux/AniAction';
import { useEffect } from 'react';
import { setToday } from '../../Redux/DailyAction';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import AniItemsCarousel from './AniItemsCarousel';
const AniMainDaily = () => {
  const reDate = new Date();
  const dayOfWeek = reDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
  const rereDate = dayOfWeek.replace(/요일/, '');
  store.dispatch(setToday(rereDate));
  const AniALLArray: AnidataTs[] = useSelector(
    (state: RootState) => state.AniState.AniALLArray,
  );
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [Day, setDay] = useState(`${rereDate}`);
  const [ButtonActive, setButtonActive] = useState(`${rereDate}`);
  const DayChange = (day: string) => {
    setDay(day);
    setActiveItemIndex(0);
    setButtonActive(day);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosAPI.post('/Ani/DayOfWeek', Day, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        store.dispatch(setAniALLArray(res.data));
      } catch (error) {
        console.log('AniMainDaily AxiosError');
      }
    };
    fetchData();
  }, [Day]);

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
      <h3 style={{ marginTop: '20px', marginBottom: '0px' }}>요일별 신작</h3>
      <Row>
        <Col className="DailyCol">
          {Daily.map((day) => (
            <Button
              key={day}
              variant="secondary"
              className={`secondary2 mb-3 ${
                day === rereDate ? 'DailyitemCol2' : ''
              } ${ButtonActive === day ? 'ButtonActive' : ''}`}
              onClick={() => DayChange(`${day}`)}
            >
              {day}
            </Button>
          ))}
        </Col>
      </Row>
      <AniItemsCarousel
        AllAniData={AniALLArray}
        setActiveItemIndex={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        RankAniItem={false}
      ></AniItemsCarousel>
    </>
  );
};

export default AniMainDaily;
