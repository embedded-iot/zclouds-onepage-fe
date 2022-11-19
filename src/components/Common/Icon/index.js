import React from 'react';

export default function Icon({ src, alt, width, height, style }) {
  return (
    <img src={src} alt={alt || 'icon'} width={width} height={height} style={style} />
  );
}
