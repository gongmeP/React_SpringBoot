import React from 'react';

function ExampleCarouselImage({ text, imageUrl }) {
  return (
    <div>
      <img
        style={{
          width: '100%',
          height: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
        }}
        src={imageUrl}
        alt={text}
      />
    </div>
  );
}

export default ExampleCarouselImage;
