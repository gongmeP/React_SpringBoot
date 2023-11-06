import React from 'react';
import { Pagination } from 'react-bootstrap';
import store from '../Redux/store';
import { setPages } from '../Redux/action';
function Page({ EA, Pages }) {
  const totoalPage = Math.ceil(EA / 15);

  const PageClick = (lastpage) => {
    if (lastpage < 0) {
      alert('첫번째 페이지 입니다.');
      return;
    }
    if (lastpage > totoalPage - 1) {
      alert('마지막 페이지 입니다.');
      return;
    }

    store.dispatch(setPages(lastpage));
  };

  return (
    <div className="d-flex justify-content-center mt-3">
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
