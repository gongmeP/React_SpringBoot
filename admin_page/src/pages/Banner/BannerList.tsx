import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import axiosAPI from 'src/axiosAPI';
import BannerItem from 'src/components/Bannercomponents/BannerItem';
import LoadingSpinner from 'src/components/MainComponents/LodingSpinner';
import { getBannerTs } from 'src/model/Banner';

const BannerList = () => {
  const [BannerList, setBannerList] = useState<getBannerTs[]>();
  const [loding, setLoding] = useState<boolean>(true);
  const ReuseEffect = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );

  useEffect(() => {
    const getbanner = async () => {
      try {
        const res = await axiosAPI.get(`/Banner/getBanner`);
        setBannerList(res.data);
      } finally {
        setLoding(false);
      }
    };
    getbanner();
  }, [ReuseEffect]);

  return (
    <>
      {!loding ? (
        <>
          {BannerList?.map((data) => (
            <BannerItem bannerdata={data}></BannerItem>
          ))}
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
};

export default BannerList;
