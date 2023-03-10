import React from 'react';
import { BaseService, SellerPaymentsService } from 'services';
import { notification } from 'antd';
import PaypalForm from 'components/Seller/SettingDetailBox/AddPaypalBox/PaypalForm';
import { useMediaQuery } from 'react-responsive';
import { PAYMENT_KEY_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function AddPaypalBox({ goBack }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;

  const handlerFinish = (values) => {
    SellerPaymentsService.createPayment({
      adapter: PAYMENT_KEY_VALUES.PAYPAL,
      ...values
    }, response => {
      notification.success({
        message: "Add paypal payment success!",
      });
      goBack();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Add paypal payment failure!"),
      });
    });
  }

  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <BoxWrapper className={`no-margin ${!isMobile && 'card-box__wrapper'}`}>
        <div className='general-setting-box__wrapper'>
          <PaypalForm
            onFinish={handlerFinish}
            onCancel={goBack}
          />
        </div>
      </BoxWrapper>
    </BoxWrapper>
  )
}
