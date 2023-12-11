package com.example.boot.Service;


import com.example.boot.Entity.Banner;
import com.example.boot.Repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class BannerServiceImpl implements  BannerService{

    private final BannerRepository bannerRepository;

    @Override
    public String SaveBanner(Banner banner) {
        try{
            banner.setCreatedTime(LocalDateTime.now());
            bannerRepository.save(banner);
            return "Banner 추가 완료";
        }catch (Exception e){

            System.out.println("BannerService SaveBanner 오류");
            return "Banner 추가 실패";
        }

    }
}
