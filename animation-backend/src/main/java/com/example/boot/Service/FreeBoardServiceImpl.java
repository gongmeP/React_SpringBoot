package com.example.boot.Service;

import com.example.boot.Entity.FreeBoard;
import com.example.boot.mappers.FreeBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FreeBoardServiceImpl implements FreeBoardService {

    @Autowired
    private  final FreeBoardMapper freeBoardMapper;

    @Override
    public List<FreeBoard> getAllFreeBoards() {

        return freeBoardMapper.getAllFreeBoards();
    }

    @Override
    public List<FreeBoard> getFreeBoardPages(int pageSize, int offset) {

        return freeBoardMapper.getFreeBoardPages(pageSize,offset);
    }

    @Override
    public int getFreeBoardTotalPages() {

        return freeBoardMapper.getFreeBoardTotalPages();
    }

    @Override
    public List<FreeBoard> SaveFreeBoards(FreeBoard freeBoard) {

        return freeBoardMapper.SaveFreeBoards(freeBoard);
    }

    @Override
    public List<FreeBoard> getIdByFreeBoards(Long fnNum) {

        return freeBoardMapper.getIdByFreeBoards(fnNum);
    }
}

