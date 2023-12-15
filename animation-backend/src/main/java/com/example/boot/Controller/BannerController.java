package com.example.boot.Controller;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Entity.Banner;
import com.example.boot.Service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class BannerController {

    private final BannerService bannerService;

    @PostMapping("/BannerAdd")
    @CrossOrigin
    public ResponseEntity<?> BannerAdd(@RequestBody Banner banner) {
       String BannerSaveText = bannerService.SaveBanner(banner);
        return ResponseEntity.ok(BannerSaveText);
    }

    @Value("${upload.Bannerdir}")
    private String Bannerdir;
    @PostMapping("/Banner/PhotoSave")
    @CrossOrigin
    @ResponseBody
    public List<String> imgSava(MultipartFile file) throws Exception{
        List<String> fileNamespath = new ArrayList<>();

        try {
            String path = Bannerdir;
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

    @GetMapping("/Banner/getBanner")
    @CrossOrigin
    public ResponseEntity<?> getBanner() {

        return ResponseEntity.ok(bannerService.findAllBanner());
    }

    @GetMapping("/Banner/getdateBanner")
    @CrossOrigin
    public ResponseEntity<?> getdateBanner() {

        return ResponseEntity.ok(bannerService.getdateBanner());
    }
    @GetMapping("/BannerUpdate/{BannerId}")
    @CrossOrigin
    public ResponseEntity<?> finByBannerId(@PathVariable Long BannerId){

        return ResponseEntity.ok(bannerService.findByBannerId(BannerId));
    }

    @PostMapping("/BannerUpdate/{BannerId}")
    @CrossOrigin
    public ResponseEntity<?> BannerUpdate(@PathVariable Long BannerId,@RequestBody Banner banner){

        return ResponseEntity.ok(bannerService.BannerUpdate(BannerId,banner));
    }

    @GetMapping("/BannerDelete/{BannerId}")
    @CrossOrigin
    public ResponseEntity<?> BannerDelete(@PathVariable Long BannerId){


        return ResponseEntity.ok(bannerService.BannerDelete(BannerId));
    }

}


