import React from 'react';

export default function Logo({ className, src, alt, width, height, style, link = '/' }) {
  return (
    <a href={link}>
      <img className={className} src={src} alt={alt || 'logo'} width={width} height={height} style={style} />
    </a>
  );
}
