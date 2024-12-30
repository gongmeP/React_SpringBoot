import React from 'react';
import { Row } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import DailyItem from '../../components/DailyAniListComponents/DailyItem';
import store from '../../Redux/store';
import { setAniALLArray } from '../../Redux/AniAction';
import DailyAniButton from '../../components/DailyAniListComponents/DailyAniButton';
import { setToday } from '../../Redux/DailyAction';
import axiosAPI from '../../axiosAPI';
import { AxiosResponse } from 'axios';
import { AnidataTs } from 'src/model/Animation';

function DailyAniList() {
  const [Loading, setLoading] = useState<boolean>(true);
  const reDate = new Date();
  const dayOfWeek = reDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
  const rereDate: string = dayOfWeek.replace(/요일/, '');
  store.dispatch(setToday(rereDate));
  const [Daily, setDaily] = useState<string[]>([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ]);
  const [Day, setDay] = useState<string>(`${rereDate}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse<AnidataTs[]> = await axiosAPI.post(
          '/Ani/DayOfWeek',
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Day]);

  return (
    <>
      {!Loading && Daily.length > 0 ? (
        <>
          <Row style={{ margin: '0 auto' }}>
            {Daily.map((day, index) => (
              <DailyItem day={day} key={index}></DailyItem>
            ))}
          </Row>
          <DailyAniButton setDay={setDay} Daily={Daily}></DailyAniButton>
        </>
      ) : null}
    </>
  );
}

export default DailyAniList;
