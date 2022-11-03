import React from 'react';
import UserInfo from 'components/Share/UserInfo';
import logo from 'images/logo.svg';
import { WEBSITE_NAME } from 'components/contants';

import './style.scss';
export default function Header({ logoName, isLogin, isAdmin, currentUser, redirectTo, signOut }) {
  return (
    <div className="header-wrapper">
      <div className='logo-portal'>
        <a href='/'>
          <img src={logo} alt={WEBSITE_NAME} />
        </a>
      </div>
      <UserInfo isLogin={isLogin}
                isAdmin={isAdmin}
                currentUser={currentUser}
                redirectTo={redirectTo}
                signOut={signOut}
      />
    </div>
  );
}
