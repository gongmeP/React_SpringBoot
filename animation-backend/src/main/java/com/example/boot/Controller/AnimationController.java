package com.example.boot.Controller;

import com.example.boot.Entity.Animation;
import com.example.boot.Service.AnimationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class AnimationController {

    private final AnimationService animationService;
    @PostMapping("/Ani")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody Animation animation){


        return new ResponseEntity<>(animationService.saveAni(animation),HttpStatus.CREATED);
    }

    @Value("${upload.Anidir}")
    private String Anidir;
    @PostMapping("/Ani/PhotoSave")
    @CrossOrigin
    @ResponseBody
    public List<String> imgSava(MultipartFile file) throws Exception{
        List<String> fileNamespath = new ArrayList<>();

        try {
            String path = Anidir;
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

    @CrossOrigin
    @GetMapping("/Ani")
    public ResponseEntity<?> findAll(@PageableDefault(page = 0,size = 15,sort = "id",direction = Sort.Direction.DESC) Pageable pageable){

        return new ResponseEntity<>(animationService.getAllAniData(pageable),HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/Ani/ALL")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(animationService.getAllAniDataALL(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/Ani/ALLOderByConter")
    public ResponseEntity<?> ALLOderByConter(){
        return new ResponseEntity<>(animationService.ALLOderByConter(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/Ani/DayOfWeek")
    public ResponseEntity<?> AniDayOfWeek(@RequestBody String day_of_week){


        return new ResponseEntity<>(animationService.getDayOfWeek(day_of_week), HttpStatus.OK);
    }

    @GetMapping("/Ani/{id}")
    @CrossOrigin
    public ResponseEntity<?> findById(@PathVariable Long id){

        return new ResponseEntity<>(animationService.getAniById(id),HttpStatus.OK);
    }

    @PutMapping("/Ani/{id}")
    @CrossOrigin
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Animation animation){

        return new ResponseEntity<>(animationService.Aniupdate(id, animation),HttpStatus.CREATED);
    }

    @PutMapping("/Ani/DeleteY/{id}")
    @CrossOrigin
    public ResponseEntity<?> DeleteY(@PathVariable Long id){

        return new ResponseEntity<>(animationService.DeleteY(id),HttpStatus.CREATED);
    }

    @GetMapping("/Ani/search")
    @CrossOrigin
    public ResponseEntity<?> SearchByTitle(String title){


        return new ResponseEntity<>(animationService.SearchByTitle(title),HttpStatus.CREATED);
    }

    @PostMapping("/Ani/GenreFilter")
    @CrossOrigin
    public ResponseEntity<?> GenreFilterByTitle(@RequestBody List<String> genre){

        List<Animation> animation = animationService.GenreFilterByTitle(genre);

        return new ResponseEntity<>(animation,HttpStatus.CREATED);
    }


    @PutMapping("/Ani/ViewCounter/{id}")
    @CrossOrigin
    public ResponseEntity<?> ViewCounter(@PathVariable Long id){

        return new ResponseEntity<>(animationService.ViewCounterupdate(id),HttpStatus.CREATED);
    }

    @GetMapping("/Ani/AniAllRanking")
    @CrossOrigin
    public ResponseEntity<?> AniRanking(){

        return new ResponseEntity<>(animationService.AllViewRanking(),HttpStatus.CREATED);
    }

    @GetMapping("/Ani/AniOneDayRanking")
    @CrossOrigin
    public ResponseEntity<?> AniOneDayRanking(){

        return new ResponseEntity<>(animationService.AniOneDayRanking(),HttpStatus.CREATED);
    }

    @GetMapping("/Ani/AniWeekRanking")
    @CrossOrigin
    public ResponseEntity<?> AniWeekRanking(){

        return new ResponseEntity<>(animationService.AniWeekRanking(),HttpStatus.CREATED);
    }

}
