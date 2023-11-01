package com.example.boot.mappers;

import com.example.boot.Entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    Member findById(Long id);
}
