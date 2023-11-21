import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AniImg } from '../../styledcomponents/AniDetail.styled';
import { API_URL } from '../../axiosAPI';

function DailyAniButton({ setDay, Daily }) {
  const reDate = new Date();
  const dayOfWeek = reDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
  const rereDate = dayOfWeek.replace(/요일/, '');

  const DayChange = (day) => {
    setDay(day);
    setButtonActive(day);
    console.log(day);
  };
  const navigate = useNavigate();
  const AniDetailGo = (id) => {
    navigate('/Ani/' + id);
  };
  const [ButtonActive, setButtonActive] = useState(`${rereDate}`);
  const AniALLArray = useSelector((state) => state.AniState.AniALLArray);

  return (
    <>
      <Row className="d-block d-lg-none">
        <Col className="DailyCol2">
          {Daily.map((day) => (
            <Button
              key={day}
              variant="secondary"
              className={`dailyButton1 ${
                day === rereDate ? 'DailyitemCol2' : ''
              } ${ButtonActive === day ? 'ButtonActive' : ''}`}
              onClick={() => DayChange(`${day}`)}
            >
              {day}
            </Button>
          ))}
        </Col>
      </Row>
      <Row className="d-block d-lg-none">
        <Col className="p-1 anicardCol">
          {AniALLArray.map((AniALLArray) => (
            <Card key={AniALLArray.id} className="anicard">
              <Card.Img
                variant="top"
                src={`${API_URL}/file/AniImgFile/${AniALLArray.photo}`}
                onClick={AniDetailGo}
                style={{ cursor: 'pointer' }}
                className="anicardimg"
              />
              <Card.Body className="p-0">
                <Card.Title
                  className="mb-0 CardTitle"
                  style={{ fontSize: '0.95rem' }}
                >
                  {AniALLArray.title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
}

export default DailyAniButton;
