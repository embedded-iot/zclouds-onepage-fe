import React from 'react';
import { Button } from 'antd';
import {
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';

export default function UserActions({ redirectTo = () => {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`user-action__wrapper ${!!isMobile && 'user-action__wrapper--mobile'}`} >
      <Button icon={<UserAddOutlined />} onClick={() => redirectTo(ROUTERS.REGISTER)}>Đăng ký</Button>
      <Button icon={<LoginOutlined />} onClick={() => redirectTo(ROUTERS.LOGIN)}>Đăng nhập</Button>
    </div>
  );
}
