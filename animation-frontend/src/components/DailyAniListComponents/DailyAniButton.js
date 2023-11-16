import React from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function DailyAniButton({ setDay, Daily }) {
  const DayChange = (day) => {
    setDay(day);
  };
  const navigate = useNavigate();
  const AniDetailGo = (id) => {
    navigate('/Ani/' + id);
  };
  const reDate = useSelector((state) => state.DailyState.today);
  const AniALLArray = useSelector((state) => state.AniState.AniALLArray);
  return (
    <>
      <Row className="d-block d-lg-none">
        <Col className="DailyCol">
          {Daily.map((day) => (
            <Button
              variant="secondary"
              className={`dailyButton1 ${
                day === reDate ? 'DailyitemCol2' : ''
              }`}
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

export default DailyAniButton;
