import React from 'react';
import ImageGalleryView from 'components/Common/ImageGalleryView';

import './style.scss';

export default function ProductImagesPreview({ product = {}}) {
  return (
    product.images ? <ImageGalleryView images={product.images || []} /> : null
  )
}
