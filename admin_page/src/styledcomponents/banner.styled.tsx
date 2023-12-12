import styled from 'styled-components';

export const ImgBox = styled.div`
  position: relative;
  width: 700px;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImgBoxMainImg = styled.img`
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export const ImgBoxMainImgText = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: auto;
  top: 25%;
  left: 3%;
`;

export const BannerBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BannerUpdateBox = styled.div`
  width: 400px;
  height: auto;
  margin-left: 50px;

  font-size: 20px;
`;

export const BannerUpdateText = styled.div`
  margin-bottom: 10px;
`;
