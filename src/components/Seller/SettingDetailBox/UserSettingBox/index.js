import React, { useEffect, useState } from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import UserSettingForm from './UserSettingForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function UserSettingBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const [userInfo, setUserInfo] = useState(null);

  const handlerFinish = (values) => {
    const { password: newPassword, name, timeZone } = values;
    const data = {
      newPassword,
      name,
      timeZone,
    };
    SellerUsersService.changeUserInfo(data, response => {
      notification.success({
        message: "Change user general success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Change user general failure!"),
      });
    });
  }

  const getUserInfo = (params = {}) => {
    SellerUsersService.getUserInfo(response => {
      setUserInfo(response);
    }, () => {})
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  if (!userInfo) {
    return null;
  }
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <div className='general-setting-box__wrapper'>
        <UserSettingForm
          onFinish={handlerFinish}
          initialValues={userInfo}
        />
      </div>
    </BoxWrapper>
  )
}
