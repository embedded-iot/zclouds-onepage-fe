import React from 'react';
import UserInfo from 'components/Share/UserInfo';

import './style.scss';

export default function Header({ logoName, isLogin, currentUser, redirectTo, signOut }) {
  return (
    <div className="header-wrapper">
      <div className='logo-portal'>
        <a href='/'>{ logoName }</a>
      </div>
      <UserInfo isLogin={isLogin}
                currentUser={currentUser}
                redirectTo={redirectTo}
                signOut={signOut}
      />
    </div>
  );
}
