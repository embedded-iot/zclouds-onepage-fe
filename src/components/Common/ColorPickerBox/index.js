import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

import './style.scss';
import { cui } from 'utils';


export default function ColorPickerBox({ label, value = '', name, onChange, ...restProps }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(() => {
    return value ? cui.hexAToRGBA(value) : {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }
  });
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '100%',
        height: '62px',
        borderRadius: '8px',
        border: '2px solid #C5C2C1',
        background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
      },
      swatch: {
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });


  return (
    <div className="color-picker-box__wrapper">
      <div className="color-picker-box__header">
        { !!label && <div className='color-picker-box__label'>{label}</div> }
        <div className='color-picker-box__color-hex-label'>{cui.RGBAToHexA(color.r, color.g, color.b, color.a)}</div>
      </div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { displayColorPicker && (
        <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose }/>
          <SketchPicker color={ color } onChange={ handleChange } />
        </div>
      )}
    </div>
  )
}
