import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  BannerBox,
  BannerUpdateBox,
  BannerUpdateText,
  ImgBox,
  ImgBoxMainImg,
  ImgBoxMainImgText,
} from 'src/styledcomponents/banner.styled';

function BannerList() {
  const navigate = useNavigate();

  const SeleteAniGo = (AniId: string) => {
    navigate(`/Ani/${AniId}`);
  };
  return (
    <>
      <BannerBox>
        <ImgBox onClick={() => SeleteAniGo('81')}>
          <ImgBoxMainImg
            src="./projectimg/banners/newbanner1.jpg"
            alt={'banner2'}
          ></ImgBoxMainImg>
          <ImgBoxMainImgText src="./projectimg/banners/newbanner1text.jpg"></ImgBoxMainImgText>
        </ImgBox>
        <BannerUpdateBox>
          <BannerUpdateText>배너 제목 : 123123123123321</BannerUpdateText>
          <BannerUpdateText>배너 URL : 123123123123321</BannerUpdateText>
          <BannerUpdateText>개시 시작일 : 123123123123321</BannerUpdateText>
          <BannerUpdateText>개시 종료일 : 123123123123321</BannerUpdateText>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <Link to={`/updateForm/${id}`}> */}
            <Button variant="warning" className="mb-1 mt-1">
              수정
            </Button>
            {/* </Link> */}
            <Button
              variant="danger"
              className="mb-1 mt-1"
              // onClick={deletAni}
            >
              삭제
            </Button>
          </div>
        </BannerUpdateBox>
      </BannerBox>
    </>
  );
}

export default BannerList;
