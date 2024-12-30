import React from 'react';
import {
  PlayDiv_Styled,
  PlayImg_Styled,
} from 'src/styledcomponents/AniDetail.styled';

interface FavoriteButtonProps {
  imgname: string;
  onClick: () => void;
  text: string;
}

const FavoriteButton = ({ imgname, onClick, text }: FavoriteButtonProps) => {
  return (
    <>
      <PlayImg_Styled src={imgname} onClick={onClick} />
      <PlayDiv_Styled onClick={onClick}>{text}</PlayDiv_Styled>
    </>
  );
};

export default FavoriteButton;
