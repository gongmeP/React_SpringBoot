import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import './BootStrapcss.css';
import { useSelector } from 'react-redux';
import store from '../Redux/store';
import { setAniALLArray } from '../Redux/action';
import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AniMainDaily() {
  const AniALLArray = useSelector((state) => state.AniALLArray);

  const [Day, setDay] = useState('월');

  const DayChange = (day) => {
    setDay(day);
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

  return (
    <>
      <div>요일별 신작</div>
      <Row>
        <Col style={{ width: '100%', height: 'auto' }}>
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
      <ItemsCarousel
        infiniteLoop={true} // 루프 해줌
        numberOfCards={5}
        enableSwipe={true} // 스와이프 활성화 모바일에서 쓰일거임
        gutter={12} // 슬라이드 사이의 간격
        showSlither={false} // 슬라이더 경계 부분을 표시할지 여부
        firstAndLastGutter={true} // 첫 번째 및 마지막 슬라이드 사이의 간격을 표시할지 여부
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
            <h3>{AniALLArray.title}</h3>
          </div>
        ))}
      </ItemsCarousel>
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

export default AniMainDaily;
