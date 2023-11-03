import React from 'react';
import { Pagination } from 'react-bootstrap';
import store from '../Redux/store';
import { useSelector } from 'react-redux';
import { setPages } from '../Redux/action';
function Page() {
  const bookEA = useSelector((stage) => stage.bookEA);
  const pages = useSelector((stage) => stage.pages);
  const totoalPage = Math.ceil(bookEA / 12) + 1;

  console.log(totoalPage);

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
        <Pagination.Prev onClick={() => PageClick(pages - 1)} />
        {Array.from({ length: totoalPage }).map((_, mapPage) => (
          <Pagination.Item
            key={mapPage}
            active={mapPage === pages}
            onClick={() => PageClick(mapPage)}
          >
            {mapPage + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => PageClick(pages + 1)} />
        <Pagination.Last onClick={() => PageClick(totoalPage - 1)} />
      </Pagination>
    </div>
  );
}

export default Page;
