import React from 'react';
import { GENERAL_SETTING_KEY_VALUES, SETTING_KEY_VALUES } from 'components/contants';
import UserSettingBox from './UserSettingBox';
import AdsAndAnalyticsBox from './AdsAndAnalyticsBox';
import DomainsSettingBox from './DomainsSettingBox';
import FreshdeskBox from './FreshdeskBox';
import KlaviyoBox from './KlaviyoBox';
import PaymentsBox from './PaymentsBox';

import './style.scss';

const SETTING_COMPONENTS = {
  [SETTING_KEY_VALUES.GENERAL]: {
    [GENERAL_SETTING_KEY_VALUES.DEFAULT]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.USER]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.ADS_AND_ANALYTICS]: AdsAndAnalyticsBox,
    [GENERAL_SETTING_KEY_VALUES.FRESHDESK]: FreshdeskBox,
    [GENERAL_SETTING_KEY_VALUES.KLAVIYO]: KlaviyoBox,
  },
  [SETTING_KEY_VALUES.PAYMENTS]: PaymentsBox,
  [SETTING_KEY_VALUES.STOREFRONT]: DomainsSettingBox,
}

export default function SettingDetailBox({ settingKey = '', subSettingKey = '', redirectTo = () => {}}) {
  const SettingComponent = settingKey ? (settingKey === SETTING_KEY_VALUES.GENERAL ? SETTING_COMPONENTS[settingKey][subSettingKey || GENERAL_SETTING_KEY_VALUES.DEFAULT] : SETTING_COMPONENTS[settingKey]) : 'div';
  return <SettingComponent />
}
