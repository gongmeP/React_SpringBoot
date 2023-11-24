import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import '../../styledcomponents/BootStrapcss.css';
import {
  ImgBox,
  ImgBoxMainImg,
  ImgBoxMainImgText,
} from '../../styledcomponents/banner.styled';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  const SeleteAniGo = (AniId) => {
    navigate(`/Ani/${AniId}`);
  };
  return (
    <Carousel fade>
      <Carousel.Item>
        <ImgBox onClick={() => SeleteAniGo('81')}>
          <ImgBoxMainImg
            src="./projectimg/banners/newbanner1.jpg"
            alt={'banner2'}
          ></ImgBoxMainImg>
          <ImgBoxMainImgText src="./projectimg/banners/newbanner1text.jpg"></ImgBoxMainImgText>
        </ImgBox>
      </Carousel.Item>
      <Carousel.Item>
        <ImgBox onClick={() => SeleteAniGo('108')}>
          <ImgBoxMainImg
            src="./projectimg/banners/newbanner2.jpg"
            alt={'banner2'}
          ></ImgBoxMainImg>
          <ImgBoxMainImgText src="./projectimg/banners/newbanner2text.jpg"></ImgBoxMainImgText>
        </ImgBox>
      </Carousel.Item>
      <Carousel.Item>
        <ImgBox onClick={() => SeleteAniGo('66')}>
          <ImgBoxMainImg
            src="./projectimg/banners/newbanner3.jpg"
            alt={'banner2'}
          ></ImgBoxMainImg>
          <ImgBoxMainImgText src="./projectimg/banners/newbanner3text.jpg"></ImgBoxMainImgText>
        </ImgBox>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
