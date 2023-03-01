import React from 'react';
import { GENERAL_SETTING_KEY_VALUES, RESPONSIVE_MEDIAS, SETTING_KEY_VALUES } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import BoxCard from 'components/Share/BoxCard';
import UserSettingBox from './UserSettingBox';
import AddAndAnalyticsBox from './AddAndAnalyticsBox';
import DomainsSettingBox from './DomainsSettingBox';


const SETTING_COMPONENTS = {
  [SETTING_KEY_VALUES.GENERAL]: {
    [GENERAL_SETTING_KEY_VALUES.DEFAULT]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.USER]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.ADS_AND_ANALYTICS]: AddAndAnalyticsBox,
    [GENERAL_SETTING_KEY_VALUES.FRESHDESK]: UserSettingBox,
    [GENERAL_SETTING_KEY_VALUES.KLAVIYO]: UserSettingBox,
  },
  [SETTING_KEY_VALUES.STOREFRONT]: DomainsSettingBox,
}

export default function SettingDetailBox({ settingKey = '', subSettingKey = '', redirectTo = () => {}}) {
  const SettingComponent = settingKey ? (settingKey === SETTING_KEY_VALUES.GENERAL ? SETTING_COMPONENTS[settingKey][subSettingKey || GENERAL_SETTING_KEY_VALUES.DEFAULT] : SETTING_COMPONENTS[settingKey]) : 'div';
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <SettingComponent />
    </BoxWrapper>
  )
}
