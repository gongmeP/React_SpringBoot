import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AniImg } from '../../styledcomponents/AniDetail.styled';
import { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import axiosAPI, { API_URL } from '../../axiosAPI';
import store from '../../Redux/store';
import { setUserViewTatle } from '../../Redux/AniAction';
import { AnidataTs, UserViewAnidataTs } from 'src/model/Animation';

const UserViewList = () => {
  const userid: string | null = window.sessionStorage.getItem('loginID');
  const [AllRank, setAllRank] = useState<UserViewAnidataTs[]>([]);

  useEffect(() => {
    if (userid !== null) {
      const UserViewList = async () => {
        const res = await axiosAPI.get(
          `/ViewList/UserViewList?userid=${userid}`,
        );
        if (res.data === '시청데이터 없음') {
          setAllRank([]);
        } else {
          setAllRank(res.data);
          store.dispatch(
            setUserViewTatle(
              res.data.map((data: UserViewAnidataTs) => data.title),
            ),
          );
        }
      };
      UserViewList();
    }
  }, []);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
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

  return (
    <>
      {AllRank.length > 0 ? (
        <>
          <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>
            최근본 작품
          </h3>
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
            {AllRank.map((anime) => (
              <div key={anime.id} className="p-0">
                <AniImg
                  onClick={() => AniDetailGo(anime.id)}
                  src={`${API_URL}/file/AniImgFile/${anime.photo}`}
                  alt={anime.photo}
                ></AniImg>
                <div className="CardTitle" style={{ fontSize: '0.95rem' }}>
                  {anime.title}
                </div>
              </div>
            ))}
          </ItemsCarousel>
        </>
      ) : null}
    </>
  );
};

export default UserViewList;
