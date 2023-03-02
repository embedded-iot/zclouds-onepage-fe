import React, { useEffect, useState } from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import KlaviyoForm from './KlaviyoForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function KlaviyoBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const [userInfo, setUserInfo] = useState(null);
  const handlerFinish = (values) => {
    SellerUsersService.changeUserGeneral('klaviyo', values, response => {
      notification.success({
        message: "Change klaviyo success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Change klaviyo failure!"),
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
        <KlaviyoForm
          initialValues={userInfo}
          onFinish={handlerFinish}
        />
      </div>
    </BoxWrapper>
  )
}
