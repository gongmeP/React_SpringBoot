import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import './BootStrapcss.css';
import { useSelector } from 'react-redux';
import store from '../Redux/store';
import { setAniALLArray } from '../Redux/action';
import { useEffect } from 'react';
function AniMainDaily() {
  const AniALLArray = useSelector((state) => state.AniALLArray);

  useEffect(() => {
    fetch(`http://localhost:8080/Ani/ALL`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);

        store.dispatch(setAniALLArray(res));
      });
  }, []);

  const postsPerPage = 10;
  const totalPages = Math.ceil(AniALLArray.length / postsPerPage);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const prevPage = () => {
    setActiveItemIndex(activeItemIndex - 3);
  };

  const nextPage = () => {
    setActiveItemIndex(activeItemIndex + 3);
  };

  return (
    <>
      <div>요일별 신작</div>
      <Row>
        <Col style={{ width: '100%', height: 'auto' }}>
          <Button variant="secondary" className="secondary2">
            월
          </Button>

          <Button variant="secondary" className="secondary2">
            화
          </Button>

          <Button variant="secondary" className="secondary2">
            수
          </Button>

          <Button variant="secondary" className="secondary2">
            목
          </Button>

          <Button variant="secondary" className="secondary2">
            금
          </Button>

          <Button variant="secondary" className="secondary2">
            토
          </Button>

          <Button variant="secondary" className="secondary2">
            일
          </Button>
        </Col>
      </Row>
      <ItemsCarousel
        infiniteLoop={true} // 루프 해줌
        numberOfCards={6}
        enableSwipe={true} // 스와이프 활성화 모바일에서 쓰일거임
        gutter={12} // 슬라이드 사이의 간격
        showSlither={true} // 슬라이더 경계 부분을 표시할지 여부
        firstAndLastGutter={true} // 첫 번째 및 마지막 슬라이드 사이의 간격을 표시할지 여부
        freeScrolling={true} // 무한 스크롤 사용 여부
        requestToChangeActive={(value) => setActiveItemIndex(value)} // 슬라이드 변경 요청 핸들러
        activeItemIndex={activeItemIndex} // 활성 슬라이드 인덱스
        slidesToScroll={3}
        rightChevron={
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
            <img src="./projectimg/button/R.jpg" width={20} height={20} />
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
            <img src="./projectimg/button/L.jpg" width={20} height={20} />
          </button>
        }
        outsideChevron={false}
      >
        {AniALLArray.map((AniALLArray) => (
          <div key={AniALLArray.id} className="p-2">
            <p>{AniALLArray.photo}</p>
            <h3>{AniALLArray.title}</h3>
          </div>
        ))}
      </ItemsCarousel>
    </>
  );
}

export default AniMainDaily;
