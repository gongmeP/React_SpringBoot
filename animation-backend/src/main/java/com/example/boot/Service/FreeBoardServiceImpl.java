package com.example.boot.Service;

import com.example.boot.Dto.FreeBoardDTO;
import com.example.boot.Entity.FreeBoard;
import com.example.boot.mappers.FreeBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
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

    @Override
    public Long FBReadCountUp(Long fnNum) {
        return freeBoardMapper. FBReadCountUp(fnNum);
    }

    @Override
    public List<FreeBoard> UpdatefreeBoardSave(FreeBoard freeBoard) {
        try{

            LocalDateTime currentTime =  LocalDateTime.now();
            freeBoard.setFbDate(currentTime);
        }catch (Exception e){
            System.out.println("FreeBoardService 오류 UpdatefreeBoardSave");
        }
        return freeBoardMapper.UpdatefreeBoardSave(freeBoard);
    }

    @Override
    public Long DeletefreeBoardSave(Long fnNum) {
        return freeBoardMapper.DeletefreeBoardSave(fnNum);
    }


    @Override
    public FreeBoardDTO BoardSearch(String fbtitle, int pageSize, int offset) {

        List<FreeBoard> freeBoard = freeBoardMapper.BoardSearch(fbtitle,pageSize,offset);

        int totalPage = freeBoardMapper.SearchTotalPage(fbtitle);


        return new FreeBoardDTO (freeBoard,totalPage);
    }
}

