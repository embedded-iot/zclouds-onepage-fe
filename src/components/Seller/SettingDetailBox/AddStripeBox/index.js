import React from 'react';
import { BaseService, SellerPaymentsService } from 'services';
import { notification } from 'antd';
import StripeForm from './StripeForm';
import { useMediaQuery } from 'react-responsive';
import { PAYMENT_KEY_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function AddStripeBox({ goBack }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;

  const handlerFinish = (values) => {
    SellerPaymentsService.createPayment({
      adapter: PAYMENT_KEY_VALUES.STRIPE,
      ...values
    }, response => {
      notification.success({
        message: "Add stripe payment success!",
      });
      goBack();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Add stripe payment failure!"),
      });
    });
  }

  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <StripeForm
        onFinish={handlerFinish}
        onCancel={goBack}
      />
    </BoxWrapper>
  )
}
