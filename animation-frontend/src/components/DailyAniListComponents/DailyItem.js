import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function DailyItem({ day }) {
  const [Ani, setDailyAni] = useState([]);
  const navigate = useNavigate();
  const Detailgo = (id) => {
    navigate('/Ani/' + id);
  };

  useEffect(() => {
    const fetchData123 = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/Ani/DayOfWeek',
          day,
          {
            headers: {
              'Content-Type': 'text/plain',
            },
          },
        );
        setDailyAni(res.data);
      } catch (error) {
        console.log('AniMainDaily AxiosError');
      }
    };
    fetchData123();
  }, [day]);

  const [Day, setDay] = useState('월');

  const DayChange = (day) => {
    setDay(day);
  };

  return (
    <>
      <Col className="DailyitemCol d-none d-lg-block">
        <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>{day}요일</div>
        {Ani.map((Ani) => (
          <Card className="anicard2" key={Ani.id}>
            <Card.Img
              variant="top"
              src={`http://localhost:8080/file/AniImgFile/${Ani.photo}`}
              onClick={() => Detailgo(Ani.id)}
              style={{ cursor: 'pointer' }}
            />
            <Card.Body className="p-0">
              <Card.Title
                className="mb-0 CardTitle2"
                style={{ fontSize: '0.9rem' }}
              >
                {Ani.title}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </>
  );
}

export default DailyItem;
