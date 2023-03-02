import React from 'react';
import { PAYMENT_KEY_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import { useMediaQuery } from 'react-responsive';
import paypalIcon from 'images/paypal_icon.svg';
import payflowIcon from 'images/paypal_payflow_icon.svg';
import stripleIcon from 'images/stripe_icon.svg';
import Icon from 'components/Common/Icon';
import { Button } from 'antd';

import './style.scss';

export default function AddPaymentBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const items = [
    {
      title: 'PAYPAL EXPRESS CHECKOUT',
      description: 'A button that enables customers to use PayPal directly from your checkout',
      icon: paypalIcon,
      key: PAYMENT_KEY_VALUES.PAYPAL,
      btnLabel: 'Add Paypal Express Checkout'
    },
    {
      title: 'PAYPAL FLOW PRO',
      description: 'You’ll need a PayPal Business Account A PayPal business account is needed to enable PayPal Payflow Pro.',
      icon: payflowIcon,
      key: PAYMENT_KEY_VALUES.PAYFLOW,
      btnLabel: 'Add Paypal Payflow Pro'
    },
    {
      title: 'STRIPE PROCESSOR',
      description: 'https://stripe.com/',
      icon: stripleIcon,
      key: PAYMENT_KEY_VALUES.STRIPE,
      btnLabel: 'Add Stripe Processor'
    },
    {
      title: 'AIRWALLEX',
      description: 'https://airwallex.com/',
      icon: null,
      key: PAYMENT_KEY_VALUES.PAYPAL,
      btnLabel: 'Add AIRWALLEX Processor'
    },
  ]
  return (
    <div className="add-payment-box__wrapper">
      {
        items.map(item => (
          <BoxWrapper className={`add-payment-box__item ${!isMobile && 'card-box__wrapper'}`}>
            <div className='add-payment-box__title'>{item.title}</div>
            { !!item.icon && <Icon src={item.icon} className= 'add-payment-box__icon'/> }
            <div className='add-payment-box__description'>{item.description}</div>
            <Button type='primary' className='add-payment-box__button'>{item.btnLabel}</Button>
          </BoxWrapper>
        ))
      }
    </div>
  )
}
