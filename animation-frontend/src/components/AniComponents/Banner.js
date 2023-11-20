import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import '../../styledcomponents/BootStrapcss.css';

function Banner() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          style={{
            width: '100%',
            height: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
          src="./projectimg/banners/banner1.jpg"
          alt={'banner1'}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            width: '100%',
            height: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
          src="./projectimg/banners/banner2.jpg"
          alt={'banner2'}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            width: '100%',
            height: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
          src="./projectimg/banners/banner3.jpg"
          alt={'banner3'}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
