package com.example.boot.Controller;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Dto.ViewListDTO;
import com.example.boot.Service.ViewListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ViewListController {

    private  final ViewListService viewListService;

    @PostMapping("/ViewList")
    @CrossOrigin
    public ResponseEntity<?> ViewList(@RequestBody ViewListDTO viewListDTO) {
        viewListService.ViewListAdd(viewListDTO);
        return ResponseEntity.ok("view List update");
    }

}
