import React from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import StripeForm from './StripeForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function AddStripeBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;

  const handlerFinish = (values) => {
    SellerUsersService.changeUserInfo(values, response => {
      notification.success({
        message: "Add stripe payment success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Add stripe payment failure!"),
      });
    });
  }

  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <BoxWrapper className={`no-margin ${!isMobile && 'card-box__wrapper'}`}>
        <div className='general-setting-box__wrapper'>
          <StripeForm
            onFinish={handlerFinish}
          />
        </div>
      </BoxWrapper>
    </BoxWrapper>
  )
}
