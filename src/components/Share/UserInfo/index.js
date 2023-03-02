import React from 'react';
import { Avatar, Space } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  CaretDownOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { filterListByPermission } from 'services/BaseService';
import './style.scss';
import DropdownMenu from 'components/Common/DropdownMenu';
import InputSearch from 'components/Common/InputSearch';
import { useMediaQuery } from 'react-responsive';

export default function UserInfo({ isAdmin = false, currentUser = {}, redirectTo = () => {}, signOut = () => {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const handleMenuClick = (key) => {
    switch (key) {
      case ROUTERS.LOGOUT:
        signOut();
        break;
      default:
        redirectTo(key);
        break;
    }
  }

  const actionItems = filterListByPermission([
    {
      label: 'User Settings',
      key: ROUTERS.SELLER_MY_ACCOUNT,
      icon:<SettingOutlined style={{ fontSize: 18 }} />,
      permission: !isAdmin,
    },
    {
      label: 'Log out',
      key: ROUTERS.LOGOUT,
      icon: <LogoutOutlined style={{ fontSize: 18 }}/>,
    },
  ]);

  return (
    <div className="user-info__wrapper">
      {
        !isMobile && (
          <InputSearch
            name={"Search"}
            placeholder="Search"
            className="user-info__input-search"
          />
        )
      }
      <DropdownMenu items={actionItems}
                    onMenuClick={handleMenuClick}
      >
        <Space>
          <Avatar
            style={{
              backgroundColor: '#87d068',
              cursor: 'pointer'
            }}
            src={currentUser.convertedAvatar}
            icon={<UserOutlined />}
          />
          <Space>
            <span>{currentUser.email || 'Email'}</span>
            <CaretDownOutlined style={{ fontSize: 18}} className="user-info__down-icon"/>
          </Space>
        </Space>
      </DropdownMenu>
    </div>
  );
}
