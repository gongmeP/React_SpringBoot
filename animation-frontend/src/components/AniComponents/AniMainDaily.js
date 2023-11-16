import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import '../../styledcomponents/BootStrapcss.css';
import { useSelector } from 'react-redux';
import store from '../../Redux/store';
import { setAniALLArray } from '../../Redux/AniAction';
import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AniImg, HomeAniImg } from '../../styledcomponents/AniDetail.styled';
function AniMainDaily() {
  const AniALLArray = useSelector((state) => state.AniState.AniALLArray);

  const [Day, setDay] = useState('월');

  const DayChange = (day) => {
    setDay(day);
    setActiveItemIndex(0);
  };

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

  const postsPerPage = 10;
  const totalPages = Math.ceil(AniALLArray.length / postsPerPage);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const navigate = useNavigate();
  const AniDetailGo = (id) => {
    navigate('/Ani/' + id);
  };

  const prevPage = () => {
    setActiveItemIndex(activeItemIndex - 2);
  };

  const nextPage = () => {
    setActiveItemIndex(activeItemIndex + 2);
  };

  //화면별로 갯수 정하는곳
  const [AniCardEA, setAniCardEA] = useState(5);
  useEffect(() => {
    const ReCardEA = () => {
      if (window.innerWidth < 576) {
        setAniCardEA(2);
      } else if (window.innerWidth < 768) {
        setAniCardEA(3);
      } else if (window.innerWidth < 992) {
        setAniCardEA(3);
      } else if (window.innerWidth < 1200) {
        setAniCardEA(4);
      } else {
        setAniCardEA(5);
      }
    };

    window.addEventListener('resize', ReCardEA);
    ReCardEA();

    return () => {
      window.removeEventListener('resize', ReCardEA);
    };
  }, []);

  const [Daily, setDaily] = useState([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ]);
  const reDate = useSelector((state) => state.DailyState.today);

  return (
    <>
      <h3 style={{ marginTop: '20px', marginBottom: '0px' }}>요일별 신작</h3>
      <Row>
        <Col className="DailyCol">
          {Daily.map((day) => (
            <Button
              variant="secondary"
              className={`secondary2 ${day === reDate ? 'DailyitemCol2' : ''}`}
              onClick={() => DayChange(`${day}`)}
            >
              {day}
            </Button>
          ))}
        </Col>
      </Row>
      <ItemsCarousel
        infiniteLoop={true} // 루프 해줌
        numberOfCards={AniCardEA}
        enableSwipe={true} // 스와이프 활성화 모바일에서 쓰일거임
        gutter={12} // 슬라이드 사이의 간격
        showSlither={false} // 슬라이더 경계 부분을 표시할지 여부
        firstAndLastGutter={false} // 첫 번째 및 마지막 슬라이드 사이의 간격을 표시할지 여부
        freeScrolling={true} // 무한 스크롤 사용 여부
        requestToChangeActive={(value) => setActiveItemIndex(value)} // 슬라이드 변경 요청 핸들러
        activeItemIndex={activeItemIndex} // 활성 슬라이드 인덱스
        slidesToScroll={2}
        rightChevron={
          <button
            type="button"
            onClick={nextPage}
            style={{
              border: '0',
              width: '25px',
              height: '25px',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src="./projectimg/button/R.jpg"
              alt="이미지"
              width={20}
              height={20}
            />
          </button>
        }
        leftChevron={
          <button
            type="button"
            onClick={prevPage}
            style={{
              border: '0',
              width: '25px',
              height: '25px',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src="./projectimg/button/L.jpg"
              alt="이미지"
              width={20}
              height={20}
            />
          </button>
        }
        outsideChevron={false}
      >
        {AniALLArray.map((AniALLArray) => (
          <div key={AniALLArray.id} className="p-0">
            <AniImg
              onClick={() => AniDetailGo(AniALLArray.id)}
              src={`http://localhost:8080/file/AniImgFile/${AniALLArray.photo}`}
              alt={AniALLArray.photo}
            ></AniImg>
            <div className="CardTitle" style={{ fontSize: '0.95rem' }}>
              {AniALLArray.title}
            </div>
          </div>
        ))}
      </ItemsCarousel>
    </>
  );
}

export default AniMainDaily;
