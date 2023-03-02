import React, { useEffect, useState } from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import FreshdeskForm from './FreshdeskForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function FreshdeskBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const [userInfo, setUserInfo] = useState(null);
  const handlerFinish = (values) => {
    SellerUsersService.changeUserGeneral('freshdesk', values, response => {
      notification.success({
        message: "Change freshdesk success!",
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
        <FreshdeskForm
          initialValues={userInfo}
          onFinish={handlerFinish}
        />
      </div>
    </BoxWrapper>
  )
}
