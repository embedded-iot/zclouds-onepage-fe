import React from 'react';
import ImageGalleryView from 'components/Common/ImageGalleryView';

import './style.scss';
const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());


export default function ProductImagesPreview({ product = {}}) {
  // const images = product ? product.images.map(img => ({
  //   original: img,
  //   thumbnail: img,
  // })) : [];
  return (
    <ImageGalleryView slides={slides} />
  )
}
