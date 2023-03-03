import React from 'react';
import { PAYMENT_CARD_KEY_VALUES } from 'components/contants';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import Icon from 'components/Common/Icon';
import visaIcon from 'images/visa_icon.svg';
import masterIcon from 'images/master_icon.svg';
import amexIcon from 'images/amex_icon.svg';
import jcbIcon from 'images/jcb_icon.svg';
import discoverIcon from 'images/discover_icon.svg';
import dinerIcon from 'images/diner_club_icon.svg';

import './style.scss';

const formatLabel = (item) => (
  <div className='accepted-payments__item'>
    <div className='accepted-payments__icon'>
      <div className='accepted-payments__card'>
        <Icon src={item.icon} />
      </div>
    </div>
    <div className='accepted-payments__name'>
      { item.label }
    </div>
    <div className='accepted-payments__type'>
      { item.type }
    </div>
  </div>
)

export default function AcceptedPaymentsBox(props) {
  const items = [
    {
      label: 'Visa',
      type: 'Credit Card',
      icon: visaIcon,
      value: PAYMENT_CARD_KEY_VALUES.VISA,
    },
    {
      label: 'Mastercard',
      type: 'Credit Card',
      icon: masterIcon,
      value: PAYMENT_CARD_KEY_VALUES.MASTER,
    },
    {
      label: 'American Express',
      type: 'Credit Card',
      icon: amexIcon,
      value: PAYMENT_CARD_KEY_VALUES.AMEX,
    },
    {
      label: 'JCB',
      type: 'Credit Card',
      icon: jcbIcon,
      value: PAYMENT_CARD_KEY_VALUES.JCB,
    },
    {
      label: 'Discover',
      type: 'Credit Card',
      icon: discoverIcon,
      value: PAYMENT_CARD_KEY_VALUES.DISCOVER,
    },
    {
      label: 'Diners Club',
      type: 'Credit Card',
      icon: dinerIcon,
      value: PAYMENT_CARD_KEY_VALUES.DINERS,
    },
  ]

  return (
    <CheckboxGroupBox options={items}
                      className={'accepted-payments__wrapper'}
                      formatLabel={formatLabel}
                      {...props}
    />
  )
}
