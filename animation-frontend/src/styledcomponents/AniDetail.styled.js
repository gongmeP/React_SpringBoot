import styled from 'styled-components';

export const AniImg = styled.img`
  width: 100%;

  border-radius: 0.3125rem;
  margin-top: 0.3125rem;
  cursor: pointer;
  @media (max-width: 575px) {
    height: auto;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    height: 92px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    height: 125px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 126px;
  }
  @media (min-width: 1201px) and (max-width: 1400px) {
    height: 120px;
  }
`;

export const DetailAniImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.3125rem;
  margin-top: 0.3125rem;
  cursor: pointer;
`;

export const StarImg = styled.img`
  width: 1.5625rem;
  height: 1.5625rem;
  margin-bottom: 0.25rem;
`;

export const StrongStyled = styled.strong`
  height: 1.5625rem;
  margin: 0;
  padding: 0;
  line-height: 1.5625rem;
`;

export const P_Styled = styled.p`
  height: 1.5625rem;
  line-height: 1.5625rem;
`;

export const P_Styled2 = styled.p`
  font-size: 1rem;
`;

export const PlayImg_Styled = styled.img`
  height: 3.75rem;
  width: 3.75rem;
  cursor: pointer;
`;

export const PlayDiv_Styled = styled.div`
  height: 3.75rem;
  width: 40%;
  font-size: 1.25rem;
  line-height: 3.75rem;
  cursor: pointer;
`;
