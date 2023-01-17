import React from 'react';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ROLE_LABELS, ROUTERS } from 'components/contants';
import systemNotificationIcon from 'images/bell_gray_icon.svg';
import myAccountIcon from 'images/my-account-icon.png';
import Icon from 'components/Common/Icon';
import { filterListByPermission } from 'services/BaseService';
import './style.scss';

export default function UserInfo({ notificationsCount = 0, isAdmin = false, currentUser = {}, selectedRouters = [], redirectTo = () => {}, goBack = () => {}, signOut = () => {}}) {
  const handleMenuClick = (e) => {
    switch (e.key) {
      case ROUTERS.LOGOUT:
        signOut();
        break;
      default:
        redirectTo(e.key);
        break;
    }
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={filterListByPermission([
        {
          label: 'My account',
          key: ROUTERS.SELLER_MY_ACCOUNT,
          icon: <Icon src={myAccountIcon} width={20} height={20} />,
          permission: !isAdmin,
        },
        {
          label: 'Logout',
          key: ROUTERS.LOGOUT,
          icon: <LogoutOutlined style={{ fontSize: 18, color: '#626F86' }}/>,
        },
      ])}
    />
  );

  const handleShowNotices = () => {
    if (selectedRouters[0] !== ROUTERS.NOTIFICATIONS) {
      redirectTo(ROUTERS.NOTIFICATIONS)
    } else {
      goBack();
    }
  }

  return (
    <div className="user-info__wrapper">
      <span className="cursor-pointer" onClick={handleShowNotices}>
        <Badge count={notificationsCount}>
          <Icon src={systemNotificationIcon}/>
        </Badge>
      </span>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow={{
          pointAtCenter: true,
        }}
      >
        <div className="user-info__avatar">
          <Avatar
            style={{
              backgroundColor: '#87d068',
              cursor: 'pointer'
            }}
            src={currentUser.convertedAvatar}
            icon={<UserOutlined />}
          />
          <div className="user-info__title">
            <span>{currentUser.username || 'User name'}</span>
            <span className="link">{ROLE_LABELS[currentUser.role] || (isAdmin ? 'Admin' : 'Seller')}</span>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
