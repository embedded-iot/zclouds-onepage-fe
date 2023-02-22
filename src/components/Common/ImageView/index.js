import React from 'react';
import ReactImageZoom from 'react-image-zoom';

export default function ImageView({ img, ...restProps }) {
  var props3 = {width: 500, height: 500, zoomWidth: 1000 }
  return (
    <ReactImageZoom
      {...props3}
      img={img}
      {...restProps}
    />
  );
}
