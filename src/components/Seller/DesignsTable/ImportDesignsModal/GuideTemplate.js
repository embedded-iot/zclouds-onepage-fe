import React from 'react';

import './style.scss';
export default function GuideTemplate() {
  const items = [
    { level: 1, text: 'Choose type "2D" if you want to create design sku for 2D products. Choose type "3D" if you want to create design sku for 3D products.' },
    { level: 1, text: 'To ensure the Design sku is uploaded smoothly. Please don\'t set images\'s name containing special characters like: !@#$%^&*()_+.'},
    { level: 1, text: 'Choose the type before select/drop the images to create the right type of design sku.'},
    { level: 1, text: 'You must set the name according to the rule to avoid errors in the manufacturing process:'},
    { level: 1, text: 'With 2d type'},
    { level: 2, text: 'Image\'s name starts with "frontside-" to upload the image to the front side position'},
    { level: 2, text: 'Image\'s name starts with "leftchest-" to upload the image to the left chest position'},
    { level: 2, text: 'Image\'s name starts with "backside-" to upload the image to th back side position.'},
    { level: 1, text: 'With 3d type'},
    { level: 2, text: 'Image\'s name starts with "mockup-" to upload the image to mockup section.'},
    { level: 2, text: 'Image\'s name starts with "design-" to upload the image to the design section.'},
    { level: 2, text: 'With pictures that are not named according to the format, they will be uploaded to the design section.'},
    { level: 1, text: 'If you want to upload multiple images to a design sku, please name the image according to the structure: "designsku_imagename". Where designsku is the design sku name, imagename is the image name you. Eg: GUCCI2409_09202124. Between the design sku name and the image name, please do not use the "-" character to to avoid errors.'},
    { level: 1, text: 'Minimum image\'s name length is 9 characters and maximum is 20 characters excluding required formatting.'},
  ]
  return (
    <div className='guide-template__wrapper'>
      <div className='guide-template__title'>
        *Note:
      </div>
      {
        items.map((item, index) => (
          <div className={`guide-template__item ${item.level === 2 && 'guide-template__item--margin-left'}`} key={index}>
            <span className='guide-template__icon' />
            <span className='guide-template__text'>{item.text}</span>
          </div>
        ))
      }
    </div>
  )
}
