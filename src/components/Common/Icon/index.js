import React from 'react';

export default function Icon({ src, activeSrc, active = false, alt, width, height, style, ...rest }) {
  return (
    <img src={active ? activeSrc : src} alt={alt || 'icon'} width={width} height={height} style={style} {...rest} />
  );
}
