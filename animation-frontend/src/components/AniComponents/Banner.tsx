import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import '../../styledcomponents/BootStrapcss.css';
import {
  ImgBox,
  ImgBoxMainImg,
  ImgBoxMainImgText,
} from '../../styledcomponents/banner.styled';
import axiosAPI, { API_URL } from 'src/axiosAPI';
import { getBannerTs } from 'src/model/Banner';

const Banner = () => {
  const [BannerList, setBannerList] = useState<getBannerTs[]>();

  const SeleteAniGo = (linkUrl: string) => {
    window.location.href = `${linkUrl}`;
  };

  useEffect(() => {
    const getbanner = async () => {
      const res = await axiosAPI.get(`/Banner/getdateBanner`);
      setBannerList(res.data);
    };
    getbanner();
  }, []);

  return (
    <Carousel fade>
      {BannerList?.map((bannerdata) => (
        <Carousel.Item>
          <ImgBox onClick={() => SeleteAniGo(bannerdata.linkUrl)}>
            <ImgBoxMainImg
              src={`${API_URL}/file/BannerFile/${bannerdata.mainimgBanner}`}
              alt={`${bannerdata.bannerId}`}
            ></ImgBoxMainImg>
            <ImgBoxMainImgText
              src={`${API_URL}/file/BannerFile/${bannerdata.textimgBanner}`}
            ></ImgBoxMainImgText>
          </ImgBox>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
