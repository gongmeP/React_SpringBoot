package com.example.boot.Service;


import com.example.boot.Entity.Banner;
import com.example.boot.Repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
    @Override
    public List<Banner> findAllBanner() {
        try{
           List<Banner> banner = bannerRepository.findAll();
            return banner;
        }catch (Exception e){
            System.out.println("BannerService findAllBanner 오류");
            return null;
        }

    }

    @Override
    public Banner findByBannerId(Long id) {
        try{
            Banner banner = bannerRepository.findByBannerId(id);
            return banner;

        }catch (Exception e){
            System.out.println("BannerService findByBannerId 에러");
            return null;

        }
    }

    @Override
    public String BannerUpdate(Long BannerId ,Banner banner) {
        try{
            Banner newBanner = bannerRepository.findByBannerId(BannerId);

            newBanner.setTitle(banner.getTitle());
            newBanner.setMainimgBanner(banner.getMainimgBanner());
            newBanner.setTextimgBanner(banner.getTextimgBanner());
            newBanner.setLinkUrl(banner.getLinkUrl());
            newBanner.setEndDate(banner.getEndDate());
            newBanner.setStartDate(banner.getStartDate());
          
            bannerRepository.save(newBanner);
            return "Banner 수정 완료";
        }catch (Exception e){

            System.out.println("BannerService SaveBanner 오류");
            return "Banner 수정 실패";
        }
    }
}
