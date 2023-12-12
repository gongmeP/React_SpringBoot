import React, { useEffect, useState } from 'react';
import axiosAPI from 'src/axiosAPI';
import BannerItem from 'src/components/Bannercomponents/BannerItem';
import LoadingSpinner from 'src/components/MainComponents/LodingSpinner';
import { getBannerTs } from 'src/model/Banner';

const BannerList = () => {
  const [BannerList, setBannerList] = useState<getBannerTs[]>();
  const [loding, setLoding] = useState<boolean>(true);

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
  }, []);

  console.log(BannerList);

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
