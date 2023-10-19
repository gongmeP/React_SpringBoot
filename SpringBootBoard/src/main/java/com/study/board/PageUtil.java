package com.study.board;

import com.study.board.entity.Board;
import com.study.board.model.PageDto;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class PageUtil {
    public PageDto page(Page<Board> list) {

        int nowPage = list.getPageable().getPageNumber() + 1; // 0부터 시작하니까 1 더해서 넘겨줌
        int startPage = Math.max(nowPage - 4, 1); // nowPage 보다 1이 큰경우 1을 반환
        int endPage = Math.min(nowPage + 9, list.getTotalPages()); // TotalPages(마지막페이지) 를 초과하면 TotalPages 를 반환

        PageDto pageDto = new PageDto(nowPage, startPage, endPage);

        return pageDto;
    }
}
