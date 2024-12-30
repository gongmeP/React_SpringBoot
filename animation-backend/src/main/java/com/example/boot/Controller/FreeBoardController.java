package com.example.boot.Controller;

import com.example.boot.Dto.FreeBoardDTO;
import com.example.boot.Entity.FreeBoard;
import com.example.boot.Entity.Member;
import com.example.boot.Service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class FreeBoardController {



    private final ResourceLoader resourceLoader;
    private final FreeBoardService freeBoardService;


   @Autowired
    public FreeBoardController(FreeBoardService freeBoardService,ResourceLoader resourceLoader) {
        this.freeBoardService = freeBoardService;
        this.resourceLoader = resourceLoader;
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
    @Value("${upload.dir}")
    private String uploadDir;
    @PostMapping("/FreeBoard/ImgSave")
    @CrossOrigin
    @ResponseBody
    public List<String>  imgSava(MultipartFile file) throws Exception{
        List<String> fileNamespath = new ArrayList<>();
        try {
            String path = uploadDir;
            UUID uuid = UUID.randomUUID();
            String fileName = uuid + "_" + file.getOriginalFilename();
            File saveFile = new File(path,fileName);
            file.transferTo(saveFile);
            fileNamespath.add(fileName);
            return fileNamespath;
        }catch (Exception e){
            System.out.println(e);
            return fileNamespath;
        }
    }


    //디테일 데이터 뽑아주는 부분
    @GetMapping("/FreeBoard/Detail/{fbNum}")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> getIdByFreeBoards(@PathVariable Long fbNum){
        List<FreeBoard> freeBoards = new ArrayList<>();
        try{
           freeBoards = freeBoardService.getIdByFreeBoards(fbNum);

        }
       catch (Exception e){

           System.out.println(e);
           System.out.println("/FreeBoard/Detail 에러");

       }
        return freeBoards;
    }

    //조회수 올리는부분
    @GetMapping("/FreeBoard/ReadCountUp/{fbNum}")
    @CrossOrigin
    @ResponseBody
    public void ReadCountUp(@PathVariable Long fbNum) {
        try {
            freeBoardService.FBReadCountUp(fbNum);

        } catch (Exception e) {
            System.out.println(e);
            System.out.println("/FreeBoard/ReadCountUp 에러");
        }

    }


    //수정
    @PostMapping("/FreeBoard/Update/{fbNum}")
    @CrossOrigin
    @ResponseBody
    public List<FreeBoard> UpdatefreeBoardSave(@ModelAttribute("SaveData") FreeBoard freeBoard, MultipartFile file) {
        List<FreeBoard> freeBoardSave = new ArrayList<>();
        try {

            freeBoardService.UpdatefreeBoardSave(freeBoard);

        } catch (Exception e) {

            System.out.println(e);
            System.out.println("/FreeBoard/Update/ 에러");
        }

        return freeBoardSave;
    }



    //삭제
    @GetMapping("/FreeBoard/Delete/{fbNum}")
    @CrossOrigin
    @ResponseBody
    public String DeletefreeBoardSave(@PathVariable Long fbNum) {

        try {

            freeBoardService.DeletefreeBoardSave(fbNum);

        } catch (Exception e) {

            System.out.println(e);
            System.out.println("/FreeBoard/Delete/ 에러");
        }

        return "DeleteOk";

    }

    @GetMapping("/FreeBoard/search")
    @CrossOrigin
    @ResponseBody
    public FreeBoardDTO BoardSearch(@RequestParam(name = "page",defaultValue = "1")int page, String fbtitle){
        int pageSize = 15;
        int offset = (page) * pageSize;

        FreeBoardDTO Searchdata = freeBoardService.BoardSearch(fbtitle,pageSize,offset);

       return Searchdata;
    }


    @PutMapping("/FreeBoardList/SelectDelete/{SelectBoardArray}")
    @CrossOrigin
    public ResponseEntity<?> selectiddeleteY(@PathVariable List<Long> SelectBoardArray){
        String messge;
        try {
            messge = freeBoardService.selectiddeleteY(SelectBoardArray);
            return ResponseEntity.ok(messge);
        }catch (Exception e){

            return ResponseEntity.ok("/FreeBoardList/SelectDelete/{SelectBoardArray} 오류");
        }
    }

    @PostMapping("/FreeBoard/MemberBoardEA")
    @CrossOrigin
    public ResponseEntity<?> MemberBoardEA(@RequestBody Member member){

        try {
          Long EA = freeBoardService.getMemberBoardEA(member);
            return ResponseEntity.ok(EA);
        }catch (Exception e){

            return ResponseEntity.ok("/FreeBoard/UserBoardEA 오류");
        }
    }





}
