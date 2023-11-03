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
}
