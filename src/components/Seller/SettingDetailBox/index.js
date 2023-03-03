import React from 'react';
import { GENERAL_SETTING_KEY_VALUES, PAYMENT_KEY_VALUES, SETTING_KEY_VALUES } from 'components/contants';
import UserSettingBox from './UserSettingBox';
import AdsAndAnalyticsBox from './AdsAndAnalyticsBox';
import DomainsSettingBox from './DomainsSettingBox';
import EditDomainBox from './EditDomainBox';
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
    "DEFAULT": UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.USER]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.ADS_AND_ANALYTICS]: AdsAndAnalyticsBox,
    [GENERAL_SETTING_KEY_VALUES.FRESHDESK]: FreshdeskBox,
    [GENERAL_SETTING_KEY_VALUES.KLAVIYO]: KlaviyoBox,
  },
  [SETTING_KEY_VALUES.PAYMENTS]: {
    "DEFAULT": PaymentsBox,
    [PAYMENT_KEY_VALUES.PAYPAL]: AddPaypalBox,
    [PAYMENT_KEY_VALUES.PAYFLOW]: AddPayflowBox,
    [PAYMENT_KEY_VALUES.STRIPE]: AddStripeBox,
    [PAYMENT_KEY_VALUES.AIRWALLEX]: AddAirwallexBox,
  },
  [SETTING_KEY_VALUES.STOREFRONT]: {
    "DEFAULT": DomainsSettingBox,
    "EDIT_DOMAIN": EditDomainBox
  },
}

export default function SettingDetailBox({ settingKey = '', subSettingKey = '', redirectTo = () => {}, goBack = () => {}}) {
  console.log(settingKey);
  let SettingComponent;
  switch (settingKey) {
    case SETTING_KEY_VALUES.STOREFRONT:
      SettingComponent = SETTING_COMPONENTS[settingKey][subSettingKey ? 'EDIT_DOMAIN' : 'DEFAULT'];
      break;
    case SETTING_KEY_VALUES.GENERAL:
    case SETTING_KEY_VALUES.PAYMENTS:
      SettingComponent = SETTING_COMPONENTS[settingKey][subSettingKey || 'DEFAULT'];
      break;
    default:
      SettingComponent = SETTING_COMPONENTS[settingKey];
  }
  return (
    <SettingComponent redirectTo={redirectTo}
                      goBack={goBack}
                      settingKey={settingKey}
                      subSettingKey={subSettingKey}
    />
  )
}
