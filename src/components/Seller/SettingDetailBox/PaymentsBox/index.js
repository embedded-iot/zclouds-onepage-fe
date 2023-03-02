import React from 'react';
import PaymentsTable from 'components/Seller/PaymentsTable';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import BoxHeader from 'components/Share/BoxHeader';
import AddPaymentBox from 'components/Seller/PaymentsTable/AddPaymentBox';

export default function PaymentsBox({ redirectTo, settingKey }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <>
      <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
        <BoxHeader
          title='Payments Providers'
          description={'Accept payments on your store using third-party providers such as PayPal or other payment methods.'}
          align='left'
        />
        <AddPaymentBox
          redirectTo={redirectTo}
          settingKey={settingKey}
        />
      </BoxWrapper>
      <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
        <BoxHeader
          title='List Payments'
          align='left'
        />
        <PaymentsTable />
      </BoxWrapper>
    </>
  )
}
