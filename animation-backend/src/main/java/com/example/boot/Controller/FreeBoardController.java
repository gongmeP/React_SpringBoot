package com.example.boot.Controller;

import com.example.boot.Entity.FreeBoard;
import com.example.boot.Service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class FreeBoardController {


    private final FreeBoardService freeBoardService;
   @Autowired
    public FreeBoardController(FreeBoardService freeBoardService) {
        this.freeBoardService = freeBoardService;
    }

    @GetMapping("/FreeBoard")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> showFreeBoard(Model model){
        List<FreeBoard> freeBoards = freeBoardService.getAllFreeBoards();

        return freeBoards;
    }

    @PostMapping("/FreeBoard/Page")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> freeBoardsPage(@RequestParam(name = "page",defaultValue = "1")int page, Model model){
       int pageSize = 10;
       int offset = (page) * pageSize;

        List<FreeBoard> freeBoardsPages = freeBoardService.getFreeBoardPages(pageSize,offset);

//        System.out.println(freeBoardsPages.toString());

        return freeBoardsPages;
    }


    @GetMapping("/FreeBoard/TotalPage")
    @CrossOrigin
    @ResponseBody
    public int freeBoardsTotalPage(Model model){

       int freeBoardsPages = freeBoardService.getFreeBoardTotalPages();

        System.out.println(freeBoardsPages);

        return freeBoardsPages;
    }

}
