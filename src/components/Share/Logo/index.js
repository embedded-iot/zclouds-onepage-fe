import React from 'react';

export default function Logo({ src, alt, width, height, style }) {
  return <img src={src} alt={alt || 'logo'} width={width} height={height} style={style} />
}
