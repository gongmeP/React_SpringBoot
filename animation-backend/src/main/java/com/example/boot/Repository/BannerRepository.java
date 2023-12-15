package com.example.boot.Repository;

import com.example.boot.Entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface BannerRepository extends JpaRepository<Banner,Long> {

    Banner findByBannerId(Long id);

    List<Banner> findByStartDateBeforeAndEndDateAfter(LocalDateTime startDate, LocalDateTime endDate);
}
