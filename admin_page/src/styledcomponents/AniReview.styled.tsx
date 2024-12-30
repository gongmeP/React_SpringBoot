import { Button, ButtonProps, Col, ColProps } from 'react-bootstrap';
import styled from 'styled-components';
interface StyledButtonProps extends ButtonProps {}
interface StyledColProps extends ColProps {}

export const AniReviewH3styled = styled.h3`
  text-align: center;
  margin: 0px;
`;

export const Pstyled = styled.p`
  margin: 0px;
  font-size: 1.2rem;
  font-weight: 500;
  height: 30px;
`;

export const Pstyled2 = styled.p`
  margin: 0px;
  font-size: 1rem;
  font-weight: 400;
  height: 30px;
`;

export const Pstyled3 = styled.p`
  margin: 0px;
  font-size: 1rem;
  font-weight: 400;
  height: 30px;
  text-align: right;
  cursor: pointer;
`;

export const AniStarDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const AniStarImg = styled.img`
  width: 30px;
  height: 30px;
  margin: 3px;
  cursor: pointer;
`;

export const ReviewText = styled.textarea`
  height: 90px;
  width: 100%;
  resize: none;
  border-color: lightgray;
  padding: 5px;
  font-size: 0.9rem;
`;

export const ReviewTextBoxDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewTextButton = styled(Button)<StyledButtonProps>`
  height: 40px;
  line-height: 40px;
  width: 80px;
  margin-left: 10px;
  background-color: #816bff !important;
  border-color: #816bff !important;
`;

export const AniStarReview = styled.div`
  text-align: center;
  color: gray;
`;

export const AniRreiewListCol = styled(Col)<StyledColProps>`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const AniReviewListDivBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AniReviewListUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
export const AniReviewListLi = styled.li`
  height: 30px;
  line-height: 30px;
`;

export const AniReviewListLi2 = styled.li`
  height: 20px;
  line-height: 20px;
  color: gray;
  margin-left: 3px;
`;

export const AniStarImgList = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 3px;
  margin-right: 3px;
  vertical-align: -2px;
`;

export const AniReviewListUsername = styled.div`
  font-size: 0.9;
`;

export const AniReviewListDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
  font-size: 1rem;
`;

export const LlikeImg = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: -2px;
`;

export const AniReviewEm = styled.em`
  font-style: normal;
  font-weight: 600;
  margin-left: 10px;
  font-size: 1.2rem;
`;

export const AniReviewEm2 = styled.em`
  font-style: normal;
  margin-left: 5px;
  font-size: 0.9rem;
`;

export const AniOderBy = styled.img`
  width: 19px;
  height: 19px;
  cursor: pointer;
`;

export const AniReviewListFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FooterUD = styled.div`
  margin-left: 10px;
  font-size: 0.8rem;
  line-height: 24px;
  cursor: pointer;
`;

export const LikeUpBox = styled.div`
  cursor: pointer;
  width: 40px;
`;
