import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import React from 'react';
import '../../styledcomponents/BootStrapcss.css';

function Banner() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <ExampleCarouselImage
          text="First slide"
          imageUrl="/projectimg/banner/1.jpg"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage
          text="Second slide"
          imageUrl="/projectimg/banner/2.jpg"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage
          text="Third slide"
          imageUrl="/projectimg/banner/3.jpg"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
