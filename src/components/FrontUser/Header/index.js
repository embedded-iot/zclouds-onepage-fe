import React from 'react';
import { WEBSITE_NAME } from 'components/contants';
import logo from 'images/logo_icon.svg';

import './style.scss';

export default function PublicHeader({ logoName, sider, redirectTo }) {
  return (
    <div className="header__wrapper">
      <div className='logo-portal'>
        <a href='/'>
          <img src={logo} alt={WEBSITE_NAME} />
        </a>
      </div>
    </div>
  );
}
