package com.example.boot.Controller;

import com.example.boot.Entity.FreeBoard;
import com.example.boot.Service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

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
    public String showFreeBoard(Model model){
        List<FreeBoard> freeBoards = freeBoardService.getAllFreeBoards();
        model.addAttribute("freeBoards",freeBoards);

        return "freeBoards";

    }

}
