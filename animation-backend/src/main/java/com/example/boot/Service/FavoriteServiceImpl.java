package com.example.boot.Service;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;
import com.example.boot.Entity.Member;
import com.example.boot.Repository.AnimationRepository;
import com.example.boot.Repository.FavoriteRepository;
import com.example.boot.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.hibernate.annotations.NotFound;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FavoriteServiceImpl implements  FavoriteService{

    private final AnimationRepository animationRepository;
    private  final FavoriteRepository favoriteRepository;
    private  final MemberRepository memberRepository;


    @Override
    public void FavoriteAdd(FavoriteDTO favoriteDTO)  {
        try{
            //아이디 있나 확인
            Optional<Member> members = memberRepository.findByMid(favoriteDTO.getMember_mid());
            Member member = members.orElseThrow(() -> new NotFoundException("Could not find member with mid: " + favoriteDTO.getMember_mid()));

                //애니번호 있나 확인
                Animation animation = animationRepository.findById(favoriteDTO.getAni_id())
                        .orElseThrow(()-> new NotFoundException("Could not found AniId : " + favoriteDTO.getAni_id()));

//                즐찾확인 후 되어있으면 에러 반환
                if (favoriteRepository.findByMemberAndAnimation(member, animation).isPresent()) {


                    throw new Exception("이미 즐겨찾기 되어있음");
                }

                //데이터를 넣는거임 favorite엔티티 memeber에다가 위에서 뽑은 member 값을 넣어주는거임
                System.out.println(member);
                System.out.println(animation);
                Favorite favorite = Favorite.builder()
                        .member(member)
                        .animation(animation)
                        .build();

                favoriteRepository.save(favorite); // 그리고 DB 저장해줌



        }catch (Exception e){
            System.out.println(e);
            System.out.println("Favorite Service Error");

        }

    }


    @Override

    public void FavoriteDelete(FavoriteDTO favoriteDTO){
      try{

          Optional<Member> members = memberRepository.findByMid(favoriteDTO.getMember_mid());
          Member member = members.orElseThrow(() -> new NotFoundException("Could not find member with mid: " + favoriteDTO.getMember_mid()));

            Animation animation = animationRepository.findById(favoriteDTO.getAni_id())
                    .orElseThrow(()-> new NotFoundException("Could not found AniId : " + favoriteDTO.getAni_id()));

             Favorite favorite = favoriteRepository.findByMemberAndAnimation(member,animation)
                    .orElseThrow(()-> new NotFoundException("Could not found favorite "));


        favoriteRepository.delete(favorite);
        }catch (Exception e){

          System.out.println(e);
          System.out.println("FavoriteDelete Service Error");
  }

    }

    @Override
    public Favorite FavoriteCheck(FavoriteDTO favoriteDTO) {

        try{
            Optional<Member> members = memberRepository.findByMid(favoriteDTO.getMember_mid());
            Member member = members.orElseThrow(() -> new NotFoundException("Could not find member with mid: " + favoriteDTO.getMember_mid()));

            Animation animation = animationRepository.findById(favoriteDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("Could not find AniId: " + favoriteDTO.getAni_id()));

            Optional<Favorite> favoriteOptional = favoriteRepository.findByMemberAndAnimation(member, animation);

            if (favoriteOptional.isPresent()) {
                return favoriteOptional.get();

            } else {
                return null;
            }

        }catch (Exception e){
            System.out.println(e);
            System.out.println("FavoriteCheck Service Error");
            return null;
        }

    }
}
