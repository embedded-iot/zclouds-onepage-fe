import React from 'react';
import UserActions from 'components/Share/UserActions';

import './style.scss';

export default function PublicHeader({ logoName, sider, redirectTo }) {
  return (
    <div className="header__wrapper">
      <div className='logo-portal'>
        <a href='/'>{ logoName }</a>
      </div>
      <div className="header__actions">
        <div className="header__menu">{ sider }</div>
        <UserActions redirectTo={redirectTo} />
      </div>
    </div>
  );
}
