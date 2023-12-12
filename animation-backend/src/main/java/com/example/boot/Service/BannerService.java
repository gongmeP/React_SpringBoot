package com.example.boot.Service;

import com.example.boot.Entity.Banner;

import java.util.List;

public interface BannerService {

    String SaveBanner(Banner banner);
    List<Banner> findAllBanner();
}
