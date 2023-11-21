import React from 'react';
import { Row } from 'react-bootstrap';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import DailyItem from '../../components/DailyAniListComponents/DailyItem';
import store from '../../Redux/store';
import { setAniALLArray } from '../../Redux/AniAction';
import DailyAniButton from '../../components/DailyAniListComponents/DailyAniButton';
import { setToday } from '../../Redux/DailyAction';
import axiosAPI from '../../axiosAPI';

function DailyAniList() {
  const reDate = new Date();
  const dayOfWeek = reDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
  const rereDate = dayOfWeek.replace(/요일/, '');
  store.dispatch(setToday(rereDate));
  const [Daily, setDaily] = useState([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ]);
  const [Day, setDay] = useState(`${rereDate}`);
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

  return (
    <>
      <Row style={{ margin: '0 auto', margin: '10px' }}>
        {Daily.map((day) => (
          <DailyItem day={day}></DailyItem>
        ))}
      </Row>
      <DailyAniButton Day={Day} setDay={setDay} Daily={Daily}></DailyAniButton>
    </>
  );
}

export default DailyAniList;
