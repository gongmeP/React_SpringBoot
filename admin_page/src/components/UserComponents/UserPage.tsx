import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { SetUserPage, SetUserSearchPage } from '../../Redux/UserAcrion';
const UserPage = () => {
  const SearchTF = useSelector(
    (state: RootState) => state.userState.UserSearchTF,
  );
  const SearchPages = useSelector(
    (state: RootState) => state.userState.UserSearchPage,
  );
  const PageSize = useSelector(
    (state: RootState) => state.userState.UserPageSize,
  );
  let Pages = useSelector((state: RootState) => state.userState.UserPage);
  const EA = useSelector((state: RootState) => state.userState.UserArrayEA);
  const totalPage: number = Math.ceil(EA / PageSize);
  const limit: number = 5;
  // 검색일때 데이터갯수 검색데이터 갯수로 업데이트
  if (SearchTF === 'Search') {
    Pages = SearchPages;
  }

  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);

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
  }, [totalPage]);

  const LimitPage = (totalPage: number, limit: number) => {
    const totalPageArray = Array(totalPage)
      .fill(0)
      .map((_, i) => i);
    return Array(Math.ceil(totalPage / limit))
      .fill(0)
      .map(() => totalPageArray.splice(0, limit));
  };

  const PageClick = (last: string, lastpage: number) => {
    if (last === 'last') {
      setCurrentPageArray(totalPageArray[totalPageArray.length - 1]);
    }

    if (lastpage < 0) {
      alert('첫번째 페이지 입니다.');
      return;
    }
    if (lastpage > totalPage - 1) {
      alert('마지막 페이지 입니다.');
      return;
    }

    // UserListItem 에 useEffect 가 발동하기 위해 페이지 다시 압로드!!

    // 검색일때 페이지 구분
    if (SearchTF === 'NotSearch') {
      store.dispatch(SetUserPage(lastpage));
    } else if (SearchTF === 'Search') {
      store.dispatch(SetUserSearchPage(lastpage));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-0">
      <Pagination>
        <Pagination.First onClick={() => PageClick('first', 0)} />
        <Pagination.Prev onClick={() => PageClick('prev', Pages - 1)} />
        {currentPageArray &&
        currentPageArray.length <= 5 &&
        currentPageArray[0] ? (
          <Pagination.Ellipsis />
        ) : null}
        {currentPageArray?.map((mapPage) => (
          <Pagination.Item
            key={mapPage}
            active={mapPage === Pages}
            onClick={() => PageClick('item', mapPage)}
          >
            {mapPage + 1}
          </Pagination.Item>
        ))}
        {currentPageArray &&
        currentPageArray.length > 1 &&
        currentPageArray.length === 5 ? (
          <Pagination.Ellipsis />
        ) : null}
        <Pagination.Next onClick={() => PageClick('next', Pages + 1)} />
        <Pagination.Last onClick={() => PageClick('last', totalPage - 1)} />
      </Pagination>
    </div>
  );
};

export default UserPage;
