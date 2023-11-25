import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const AniReviewH3styled = styled.h3`
  text-align: center;
`;

export const Pstyled = styled.p`
  margin: 0px;
  font-size: 1.2rem;
  font-weight: 500;
  height: 30px;
`;

export const AniStarDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const AniStarImg = styled.img`
  width: 30px;
  height: 30px;
  margin: 3px;
`;

export const ReviewText = styled.textarea`
  height: 80px;
  width: 100%;
  resize: none;
`;

export const ReviewTextBoxDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewTextButton = styled(Button)`
  height: 40px;
  line-height: 40px;
  width: 80px;
  margin-left: 10px;
  background-color: #816bff !important;
`;
