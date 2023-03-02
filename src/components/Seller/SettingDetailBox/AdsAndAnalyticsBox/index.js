import React, { useEffect, useState } from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import AdsAndAnalyticForm from './AdsAndAnalyticForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function UserSettingBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const [userInfo, setUserInfo] = useState(null);
  const handlerFinish = (values) => {
    SellerUsersService.changeUserGeneral('ads-analytics', values, response => {
      notification.success({
        message: "Change user general success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Change user general failure!"),
      });
    });
  }

  const getUserGeneral = (params = {}) => {
    SellerUsersService.getUserGeneral(response => {
      setUserInfo(response);
    }, () => {})
  }

  useEffect(() => {
    getUserGeneral();
  }, []);
  if (!userInfo) {
    return null;
  }
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <div className='general-setting-box__wrapper'>
        <AdsAndAnalyticForm
          initialValues={userInfo}
          onFinish={handlerFinish}
        />
      </div>
    </BoxWrapper>
  )
}
