import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';
import LoadingSpinner from '../MainComponents/LodingSpinner';
import { RootState } from 'src/Redux/store';
import { AnidataTs } from 'src/model/Animation';

interface DailyitemProp {
  day: string;
}

const DailyItem = ({ day }: DailyitemProp) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [Ani, setDailyAni] = useState<AnidataTs[]>([]);
  const navigate = useNavigate();
  const Detailgo = (id: number) => {
    navigate('/Ani/' + id);
  };
  const reDate = useSelector((state: RootState) => state.DailyState.today);

  useEffect(() => {
    const fetchData123 = async () => {
      try {
        const res = await axiosAPI.post('/Ani/DayOfWeek', day, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        setDailyAni(res.data);
        setLoading(false);
      } catch (error) {
        console.log('AniMainDaily AxiosError');
        setLoading(true);
      }
    };
    fetchData123();
  }, [day]);

  return (
    <>
      <Col
        className={`DailyitemCol d-none d-lg-block ${
          day === reDate ? 'DailyitemCol2' : ''
        }`}
      >
        <div
          style={{ textAlign: 'center', fontSize: '1.2rem' }}
          className={`${day === reDate ? 'DailyitemCol2' : ''}`}
        >
          {day}요일
        </div>

        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <>
            {Ani.map((Ani) => (
              <Card className="anicard2" key={Ani.id}>
                <Card.Img
                  variant="top"
                  src={`${API_URL}/file/AniImgFile/${Ani.photo}`}
                  onClick={() => Detailgo(Ani.id)}
                  style={{ cursor: 'pointer' }}
                />
                <Card.Body className="p-0">
                  <Card.Title
                    className={`mb-0 CardTitle2 ${
                      day === reDate ? 'DailyitemCol2' : ''
                    }`}
                    style={{ fontSize: '0.9rem' }}
                  >
                    {Ani.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </Col>
    </>
  );
};

export default DailyItem;
