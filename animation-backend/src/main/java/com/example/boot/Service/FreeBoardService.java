package com.example.boot.Service;

import com.example.boot.Entity.FreeBoard;

import java.util.List;

public interface FreeBoardService {

    List<FreeBoard> getAllFreeBoards();

    List<FreeBoard> getFreeBoardPages(int pageSize, int offset);

    int getFreeBoardTotalPages();

    List<FreeBoard> SaveFreeBoards(FreeBoard freeBoard);
}
