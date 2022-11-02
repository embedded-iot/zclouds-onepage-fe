import React from 'react';
import UserInfo from 'components/Share/UserInfo';

import 'components/Share/Header/style.scss';

export default function Header({ logoName, isLogin, isAdmin, currentUser, redirectTo, signOut }) {
  return (
    <div className="header-wrapper">
      <div className='logo-portal'>
        <a href='/Outsource/react-app/public'>{ logoName }</a>
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
