import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AniImg } from '../../styledcomponents/AniDetail.styled';
import { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Button } from 'react-bootstrap';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { AnidataTs } from 'src/model/Animation';

const AniRanking = () => {
  const [AllRank, setAllRank] = useState<AnidataTs[]>([]);
  const [ButtonActive, setButtonActive] = useState<string>('today');
  useEffect(() => {
    const AniAllRanking = async () => {
      let res;
      if (ButtonActive === 'today') {
        res = await axiosAPI.get(`/Ani/AniOneDayRanking`);
      } else if (ButtonActive === 'thisWeek') {
        res = await axiosAPI.get(`/Ani/AniWeekRanking`);
      } else {
        res = await axiosAPI.get(`/Ani/AniAllRanking`);
      }
      setAllRank(res.data);
    };
    AniAllRanking();
  }, [ButtonActive]);

  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const prevPage = () => {
    setActiveItemIndex(activeItemIndex - 2);
  };

  const nextPage = () => {
    setActiveItemIndex(activeItemIndex + 2);
  };
  const navigate = useNavigate();
  const AniDetailGo = (id: number) => {
    navigate('/Ani/' + id);
  };

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

  const RangkingDataOn = (day: string) => {
    setActiveItemIndex(0);
    setButtonActive(day);
  };

  return (
    <>
      {AllRank.length > 0 && (
        <>
          <h3 style={{ marginTop: '10px', marginBottom: '20px' }}>
            인기 애니 TOP10
          </h3>
          <div>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'today' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('today')}
            >
              일간
            </Button>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'thisWeek' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('thisWeek')}
            >
              주간
            </Button>
            <Button
              variant="secondary"
              className={`mb-3 RankingButton ${
                ButtonActive === 'allTime' ? 'ButtonActive' : ''
              }`}
              onClick={() => RangkingDataOn('allTime')}
            >
              역대
            </Button>
          </div>
          <ItemsCarousel
            infiniteLoop={true} // 루프 해줌
            numberOfCards={AniCardEA}
            enableSwipe={true} // 스와이프 활성화 모바일에서 쓰일거임
            gutter={9} // 슬라이드 사이의 간격
            showSlither={true} // 슬라이더 경계 부분을 표시할지 여부
            firstAndLastGutter={true} // 첫 번째 및 마지막 슬라이드 사이의 간격을 표시할지 여부
            freeScrolling={true} // 무한 스크롤 사용 여부
            requestToChangeActive={(value: number) => setActiveItemIndex(value)} // 슬라이드 변경 요청 핸들러
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
            {AllRank.map((AllRank, index) => (
              <div key={AllRank.id} className="p-0">
                <AniImg
                  onClick={() => AniDetailGo(AllRank.id)}
                  src={`${API_URL}/file/AniImgFile/${AllRank.photo}`}
                  alt={AllRank.photo}
                ></AniImg>
                <div style={{ display: 'flex' }}>
                  <h3 style={{ marginRight: '6px' }}>{index + 1}</h3>
                  <div className="CardTitle" style={{ fontSize: '0.95rem' }}>
                    {AllRank.title}
                  </div>
                </div>
              </div>
            ))}
          </ItemsCarousel>
        </>
      )}
    </>
  );
};

export default AniRanking;
