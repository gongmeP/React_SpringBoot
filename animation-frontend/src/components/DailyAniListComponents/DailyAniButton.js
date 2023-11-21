import React from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
        <Col className="DailyCol">
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
      <Row className="d-block d-lg-none d-flex">
        {AniALLArray.map((AniALLArray) => (
          <Col key={AniALLArray.id} className="p-1" md={3} sm={4} xs={4}>
            <AniImg
              onClick={() => AniDetailGo(AniALLArray.id)}
              src={`${API_URL}/file/AniImgFile/${AniALLArray.photo}`}
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

export default DailyAniButton;
