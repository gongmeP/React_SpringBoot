package com.example.boot.Service;


import com.example.boot.Entity.Banner;
import com.example.boot.Repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
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
    public List<Banner> getdateBanner() {
        try{
            LocalDateTime Today = LocalDateTime.now();
            System.out.println(Today);
            List<Banner> banner = bannerRepository.findByStartDateBeforeAndEndDateAfter(Today,Today);

            if (banner.isEmpty()) {
                System.out.println("getdateBanner: 해당 범위의 배너가 없습니다.");
            }
            return banner;
        }catch (Exception e){
            System.out.println("BannerService getdateBanner 오류");
            System.out.println(e);
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

            System.out.println("BannerService Update 오류");
            return "Banner 수정 실패";
        }
    }

    @Override
    public String BannerDelete(Long BannerId) {
        try{
            Banner deletebanner = bannerRepository.findByBannerId(BannerId);
            if(deletebanner!=null){
                bannerRepository.delete(deletebanner);
                return "배너 삭제 완료";
            }else{
                return "요청 배너 미존재";
            }
        }catch (Exception e){
            System.out.println("BannerService Delete");
            return null;
        }
    }
}
