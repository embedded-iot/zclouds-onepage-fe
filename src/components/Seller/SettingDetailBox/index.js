import React from 'react';
import { GENERAL_SETTING_KEY_VALUES, PAYMENT_KEY_VALUES, SETTING_KEY_VALUES } from 'components/contants';
import UserSettingBox from './UserSettingBox';
import AdsAndAnalyticsBox from './AdsAndAnalyticsBox';
import DomainsSettingBox from './DomainsSettingBox';
import FreshdeskBox from './FreshdeskBox';
import KlaviyoBox from './KlaviyoBox';
import PaymentsBox from './PaymentsBox';
import AddPaypalBox from './AddPaypalBox';
import AddPayflowBox from './AddPayflowBox';
import AddStripeBox from './AddStripeBox';
import AddAirwallexBox from './AddAirwallexBox';

import './style.scss';

const SETTING_COMPONENTS = {
  [SETTING_KEY_VALUES.GENERAL]: {
    default: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.USER]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.ADS_AND_ANALYTICS]: AdsAndAnalyticsBox,
    [GENERAL_SETTING_KEY_VALUES.FRESHDESK]: FreshdeskBox,
    [GENERAL_SETTING_KEY_VALUES.KLAVIYO]: KlaviyoBox,
  },
  [SETTING_KEY_VALUES.PAYMENTS]: {
    default: PaymentsBox,
    [PAYMENT_KEY_VALUES.PAYPAL]: AddPaypalBox,
    [PAYMENT_KEY_VALUES.PAYFLOW]: AddPayflowBox,
    [PAYMENT_KEY_VALUES.STRIPE]: AddStripeBox,
    [PAYMENT_KEY_VALUES.AIRWALLEX]: AddAirwallexBox,
  },
  [SETTING_KEY_VALUES.STOREFRONT]: DomainsSettingBox,
}

export default function SettingDetailBox({ settingKey = '', subSettingKey = '', redirectTo = () => {}}) {
  const SettingComponent = settingKey ? ((settingKey === SETTING_KEY_VALUES.GENERAL || settingKey === SETTING_KEY_VALUES.PAYMENTS) ? SETTING_COMPONENTS[settingKey][subSettingKey || 'default'] : SETTING_COMPONENTS[settingKey]) : 'div';
  return (
    <SettingComponent redirectTo={redirectTo}
                      settingKey={settingKey}
    />
  )
}
