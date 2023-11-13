import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import store from '../../Redux/store';
import { setPages, setSearchPages } from '../../Redux/action';
import { useSelector } from 'react-redux';
function Page({ EA, Pages }) {
  const SearchTF = useSelector((store) => store.AniBoardState.SearchTF);
  const totalPage = Math.ceil(EA / 15);
  const SearchPages = useSelector((state) => state.AniBoardState.SearchPages);
  const limit = 5;
  //검색일때 데이터갯수 검색데이터 갯수로 업데이트
  if (SearchTF === 'Search') {
    Pages = SearchPages;
  }

  const [totalPageArray, setTotalPageArray] = useState([]);
  const [currentPageArray, setCurrentPageArray] = useState([]);

  useEffect(() => {
    if (Pages % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(Pages / limit)]);
    } else if (Pages % limit === 4) {
      setCurrentPageArray(totalPageArray[Math.floor(Pages / limit)]);
    }
  }, [Pages]);

  useEffect(() => {
    const slicedPageArray = LimitPage(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
    console.log(slicedPageArray);
  }, [totalPage]);

  const LimitPage = (totalPage, limit) => {
    const totalPageArray = Array(totalPage)
      .fill()
      .map((_, i) => i);
    return Array(Math.ceil(totalPage / limit))
      .fill()
      .map(() => totalPageArray.splice(0, limit));
  };

  const PageClick = (lastpage) => {
    if (lastpage < 0) {
      alert('첫번째 페이지 입니다.');
      return;
    }
    if (lastpage > totalPage - 1) {
      alert('마지막 페이지 입니다.');
      return;
    }

    //검색일때 페이지 구분
    if (SearchTF === 'NotSearch') {
      store.dispatch(setPages(lastpage));
    } else if (SearchTF === 'Search') {
      store.dispatch(setSearchPages(lastpage));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-0">
      <Pagination>
        <Pagination.First onClick={() => PageClick(0)} />
        <Pagination.Prev onClick={() => PageClick(Pages - 1)} />
        {currentPageArray?.map((mapPage) => (
          <Pagination.Item
            key={mapPage}
            active={mapPage === Pages}
            onClick={() => PageClick(mapPage)}
          >
            {mapPage + 1}
          </Pagination.Item>
        ))}
        {/* <Pagination.Ellipsis /> */}
        <Pagination.Next onClick={() => PageClick(Pages + 1)} />
        <Pagination.Last onClick={() => PageClick(totalPage - 1)} />
      </Pagination>
    </div>
  );
}

export default Page;
