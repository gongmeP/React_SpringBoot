import React from 'react';
import { Pagination } from 'react-bootstrap';
import store from '../../Redux/store';
import { setPages, setSearchPages } from '../../Redux/action';
import { useSelector } from 'react-redux';
function Page({ EA, Pages }) {
  const SearchTF = useSelector((store) => store.SearchTF);

  console.log(SearchTF);
  const totoalPage = Math.ceil(EA / 15);
  const SearchPages = useSelector((state) => state.SearchPages);

  //검색일때 데이터갯수 검색데이터 갯수로 업데이트
  if (SearchTF === 'Search') {
    Pages = SearchPages;
  }
  const PageClick = (lastpage) => {
    if (lastpage < 0) {
      alert('첫번째 페이지 입니다.');
      return;
    }
    if (lastpage > totoalPage - 1) {
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
        {Array.from({ length: totoalPage }).map((_, mapPage) => (
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
        <Pagination.Last onClick={() => PageClick(totoalPage - 1)} />
      </Pagination>
    </div>
  );
}

export default Page;
