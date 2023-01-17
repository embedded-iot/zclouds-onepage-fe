import React from 'react';
import UserActions from 'components/FrontUser/UserActions';
import { WEBSITE_NAME } from 'components/contants';
import logo from 'images/logo-3.svg';

import './style.scss';

export default function PublicHeader({ logoName, sider, redirectTo }) {
  return (
    <div className="header__wrapper">
      <div className='logo-portal'>
        <a href='/'>
          <img src={logo} alt={WEBSITE_NAME} />
        </a>
      </div>
      <div className="header__actions">
        <div className="header__menu">{ sider }</div>
        <UserActions redirectTo={redirectTo} />
      </div>
    </div>
  );
}
