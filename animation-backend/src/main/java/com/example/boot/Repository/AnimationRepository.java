package com.example.boot.Repository;

import com.example.boot.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimationRepository extends JpaRepository<Book,Long> {


}
