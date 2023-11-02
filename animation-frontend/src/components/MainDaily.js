import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import './BootStrapcss.css';
function MainDaily() {
  const posts = [
    { id: 1, image: '이미지1', title: '애니메이션 제목 1' },
    { id: 2, image: '이미지2', title: '애니메이션 제목 2' },
    { id: 3, image: '이미지3', title: '애니메이션 제목 3' },
    { id: 4, image: '이미지4', title: '애니메이션 제목 4' },
    { id: 5, image: '이미지5', title: '애니메이션 제목 5' },
    { id: 6, image: '이미지6', title: '애니메이션 제목 6' },
    { id: 7, image: '이미지7', title: '애니메이션 제목 7' },
    { id: 8, image: '이미지8', title: '애니메이션 제목 8' },
    { id: 9, image: '이미지9', title: '애니메이션 제목 9' },
    { id: 10, image: '이미지10', title: '애니메이션 제목 10' },

    // 추가 게시글
  ];

  const postsPerPage = 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);
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
      <div>
        <Button variant="secondary">월</Button>
        <Button variant="secondary">화</Button>
        <Button variant="secondary">수</Button>
        <Button variant="secondary">목</Button>
        <Button variant="secondary">금</Button>
        <Button variant="secondary">토</Button>
        <Button variant="secondary">일</Button>
      </div>
      <ItemsCarousel
        infiniteLoop={true} // 루프 해줌
        numberOfCards={5}
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
            <img src="./projectimg/button/R.jpg" width={25} height={25} />
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
            <img src="./projectimg/button/L.jpg" width={25} height={25} />
          </button>
        }
        outsideChevron={false}
      >
        {posts.map((post) => (
          <div key={post.id} className="p-2">
            <h3>{post.image}</h3>
            <p>{post.title}</p>
          </div>
        ))}
      </ItemsCarousel>
    </>
  );
}

export default MainDaily;
