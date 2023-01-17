import React from 'react';

export default function Logo({ src, alt, width, height, style, link = '/' }) {
  return (
    <a href={link}>
      <img src={src} alt={alt || 'logo'} width={width} height={height} style={style} />
    </a>
  );
}
