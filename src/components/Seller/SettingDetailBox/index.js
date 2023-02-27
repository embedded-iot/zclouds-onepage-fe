import React from 'react';
import { SETTING_KEY_VALUES } from 'components/contants';
import DomainsTable from 'components/Seller/DomainsTable';

const SETTING_COMPONENTS = {
  [SETTING_KEY_VALUES.STOREFRONT]: DomainsTable,
}

export default function SettingDetailBox({ settingKey = '', redirectTo = () => {}}) {
  const SettingComponent = SETTING_COMPONENTS[settingKey] || 'div';
  return (
    <SettingComponent />
  )
}
