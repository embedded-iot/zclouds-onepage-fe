import React from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import PayflowForm from './PayflowForm';
import { useMediaQuery } from 'react-responsive';
import { PAYMENT_KEY_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function AddPayflowBox({ goBack }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;

  const handlerFinish = (values) => {
    SellerUsersService.changeUserInfo({
      adapter: PAYMENT_KEY_VALUES.PAYFLOW,
      ...values
    }, response => {
      notification.success({
        message: "Add paypal flow payment success!",
      });
      goBack();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Add paypal flow payment failure!"),
      });
    });
  }

  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <PayflowForm
        onFinish={handlerFinish}
        onCancel={goBack}
      />
    </BoxWrapper>
  )
}
