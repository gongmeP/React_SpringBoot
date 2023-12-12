import React from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from 'src/axiosAPI';
import { getBannerTs } from 'src/model/Banner';
import {
  BannerBox,
  BannerUpdateBox,
  BannerUpdateText,
  ImgBox,
  ImgBoxMainImg,
  ImgBoxMainImgText,
} from 'src/styledcomponents/banner.styled';

interface BannerItemProp {
  bannerdata: getBannerTs;
}

const BannerItem = ({ bannerdata }: BannerItemProp) => {
  function DateTime(fbDate: Date) {
    const date = new Date(fbDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const SeleteAniGo = (linkUrl: string) => {
    window.location.href = `${linkUrl}`;
  };
  return (
    <>
      <BannerBox>
        <ImgBox onClick={() => SeleteAniGo(bannerdata.linkUrl)}>
          <ImgBoxMainImg
            src={`${API_URL}/file/BannerFile/${bannerdata.mainimgBanner}`}
            alt={`${bannerdata.bannerId}`}
          ></ImgBoxMainImg>
          <ImgBoxMainImgText src="./projectimg/banners/newbanner1text.jpg"></ImgBoxMainImgText>
        </ImgBox>
        <BannerUpdateBox>
          <BannerUpdateText>배너 제목 : {bannerdata.title}</BannerUpdateText>
          <BannerUpdateText>배너 URL : {bannerdata.linkUrl}</BannerUpdateText>
          <BannerUpdateText>
            개시 시작일 : {DateTime(bannerdata.startDate)}
          </BannerUpdateText>
          <BannerUpdateText>
            개시 종료일 : {DateTime(bannerdata.endDate)}
          </BannerUpdateText>
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
};

export default BannerItem;
