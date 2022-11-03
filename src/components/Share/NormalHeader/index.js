import React from 'react';
import logo_lg from 'images/logo_lg.svg';
import { WEBSITE_NAME } from 'components/contants';

import './style.scss';
export default function NormalHeader() {
  return (
    <div className="normal-header__wrapper">
      <div className='logo-portal'>
        <a href='/'>
          <img src={logo_lg} alt={WEBSITE_NAME} />
        </a>
      </div>
    </div>
  );
}
