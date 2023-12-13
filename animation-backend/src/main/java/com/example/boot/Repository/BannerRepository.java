package com.example.boot.Repository;

import com.example.boot.Entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner,Long> {

    Banner findByBannerId(Long id);

}
