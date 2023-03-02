import React from 'react';
import { GENERAL_SETTING_KEY_VALUES } from 'components/contants';
import { PAYMENTS } from 'components/Seller/PaymentsTable/AddPaymentBox';
import Icon from 'components/Common/Icon';

import './style.scss';

export default function AddPaymentSiderBox({ settingKey, subSettingKey = GENERAL_SETTING_KEY_VALUES.USER, redirectTo = () => {} }) {
  const selectedPayment = PAYMENTS.find(item => item.key === subSettingKey) || {};
  return (
    <div className='add-payment-box__item'>
      <div className='add-payment-box__title'>{selectedPayment.title}</div>
      { !!selectedPayment.icon && <Icon src={selectedPayment.icon} className= 'add-payment-box__icon'/> }
      <div className='add-payment-box__description'>{selectedPayment.description}</div>
    </div>
  )
}
