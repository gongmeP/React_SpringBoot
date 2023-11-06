package com.example.boot.Controller;

import com.example.boot.Entity.FreeBoard;
import com.example.boot.Service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
       int pageSize = 15;
       int offset = (page) * pageSize;

        List<FreeBoard> freeBoardsPages = freeBoardService.getFreeBoardPages(pageSize,offset);


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

    @PostMapping("/FreeBoard/Save")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> freeBoardSave(@ModelAttribute("SaveData") FreeBoard freeBoard, MultipartFile file) {
        List<FreeBoard> freeBoardSave = new ArrayList<>();
        try {

            freeBoardService.SaveFreeBoards(freeBoard);

        } catch (Exception e) {

            System.out.println(e);
            System.out.println("/FreeBoard/Save 에러");
        }

        return freeBoardSave;
    }

    @PostMapping("/FreeBoard/ImgSave")
    @CrossOrigin
    @ResponseBody
    public List<String>  imgSava(MultipartFile file) throws Exception{
        List<String> fileNamespath = new ArrayList<>();
        System.out.println("asdasd");
        try {
            String Path = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\file";

            UUID uuid = UUID.randomUUID();

            String fileName = uuid + "_" + file.getOriginalFilename();

            File saveFile = new File(Path,fileName);

            file.transferTo(saveFile);

            fileNamespath.add(fileName);
            System.out.println(fileNamespath);
            return fileNamespath;


        }catch (Exception e){
            System.out.println(e);
            return fileNamespath;
        }
    }


    @GetMapping("/FreeBoard/Detail/{fbNum}")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> getIdByFreeBoards(@PathVariable Long fbNum){
        List<FreeBoard> freeBoards = freeBoardService.getIdByFreeBoards(fbNum);

        return freeBoards;
    }

}
