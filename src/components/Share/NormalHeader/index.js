import React from 'react';
import logo_lg from 'images/logo_icon.svg';
import Logo from 'components/Share/Logo';

import './style.scss';
export default function NormalHeader() {
  return (
    <div className="normal-header__wrapper">
      <div className='logo-portal'>
        <Logo src={logo_lg} height={64} />
      </div>
    </div>
  );
}
