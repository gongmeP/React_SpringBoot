package com.example.boot.Controller;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Dto.ViewListDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Service.ViewListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ViewListController {

    private final ViewListService viewListService;

    @PostMapping("/ViewList")
    @CrossOrigin
    public ResponseEntity<?> ViewList(@RequestBody ViewListDTO viewListDTO) {
        viewListService.ViewListAdd(viewListDTO);
        return ResponseEntity.ok("view List update");
    }

    @GetMapping("/ViewList/UserViewList")
    @CrossOrigin
    public ResponseEntity<?> UserViewList(@RequestParam String userid) {


        List<Animation> animationlist = viewListService.ViewListgatdata(userid);
        
        if (animationlist != null) {
            return ResponseEntity.ok(animationlist);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("시청데이터 없음");
        }
    }

}
