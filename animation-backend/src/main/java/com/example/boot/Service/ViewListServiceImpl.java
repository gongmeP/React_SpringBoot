package com.example.boot.Service;

import com.example.boot.Dto.ViewListDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;
import com.example.boot.Entity.Member;
import com.example.boot.Entity.ViewList;
import com.example.boot.Repository.AnimationRepository;
import com.example.boot.Repository.MemberRepository;
import com.example.boot.Repository.ViewListRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ViewListServiceImpl implements  ViewListService{

    private final AnimationRepository animationRepository;
    private final MemberRepository memberRepository;
    private  final ViewListRepository viewListRepository;

    @Override
    public void ViewListAdd(ViewListDTO viewListDTO) {

        try{
            Member member = memberRepository.findByMid(viewListDTO.getMember_mid())
                    .orElseThrow(() -> new NotFoundException("맴버 mid 미존재: " + viewListDTO.getMember_mid()));

            System.out.println(member);

            Animation animation = animationRepository.findById(viewListDTO.getAni_id())
                    .orElseThrow(()-> new NotFoundException("애니 id 미존재 : " + viewListDTO.getAni_id()));

            Optional<ViewList> viewlist = viewListRepository.findByMemberAndAnimation(member, animation);
            if (viewlist.isPresent()) {
                ViewList viewListTimeUpdate = viewlist.get();
                viewListTimeUpdate.setViewtime(LocalDateTime.now());
                viewListRepository.save(viewListTimeUpdate);
                System.out.println("기존값 존재 시간만 업데이트");
            }else{
                ViewList viewList = ViewList.builder()
                        .member(member)
                        .animation(animation)
                        .viewtime(LocalDateTime.now())
                        .build();
                viewListRepository.save(viewList);
            }
        }catch (Exception e){
            System.out.println(e);
            System.out.println("ViewList Service Data In Error");
        }

    }

    @Override
    public List<Animation> ViewListgatdata(String userid) {
        try{
            List<Animation> animations = null;
            Optional<Member> useridcheck = memberRepository.findByMid(userid);

            if(useridcheck.isPresent()){
                Pageable pageable = PageRequest.of(0,10 , Sort.by("viewtime").descending());

                List<ViewList> viewList = viewListRepository.findByMemberId(useridcheck.get().getId(),pageable);


                animations = viewList.stream()
                        .map(ViewList::getAnimation)
                        .collect(Collectors.toList());

                System.out.println(animations);

            }
            return animations;

        }catch (Exception e){
            System.out.println(e);
            System.out.println("FavoriteService FavoriteList 오류");
            return null;
        }


    }
}
