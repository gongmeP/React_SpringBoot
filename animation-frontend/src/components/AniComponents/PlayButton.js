import React from 'react';
import {
  PlayDiv_Styled,
  PlayImg_Styled,
} from '../../styledcomponents/AniDetail.styled';

const PlayButton = ({ onClick, buttonText, imgSrc }) => {
  return (
    <>
      <PlayImg_Styled src={imgSrc} onClick={onClick} />
      <PlayDiv_Styled onClick={onClick}>{buttonText}</PlayDiv_Styled>
    </>
  );
};

export default PlayButton;
