import React from 'react';
import { GENERAL_SETTING_KEY_VALUES, ROUTERS } from 'components/contants';

import './style.scss';

export default function SettingSubSiderBox({ settingKey, subSettingKey = GENERAL_SETTING_KEY_VALUES.USER, redirectTo = () => {} }) {
  const items = [
    {
      label: 'User',
      key: GENERAL_SETTING_KEY_VALUES.USER,
    },
    {
      label: 'Ads & Analytics',
      key: GENERAL_SETTING_KEY_VALUES.ADS_AND_ANALYTICS,
    },
    {
      label: 'Freshdesk',
      key: GENERAL_SETTING_KEY_VALUES.FRESHDESK,
    },
    {
      label: 'Klaviyo',
      key: GENERAL_SETTING_KEY_VALUES.KLAVIYO,
    },
  ]

  const handleClick = key => {
    redirectTo(ROUTERS.SELLER_SETTINGS + '/' + settingKey + '/' + key);
  }
  return (
    <div className='setting-sub-sider-box__wrapper'>
      {
        items.map(item => (
          <div className={`setting-sub-sider-box__item ${item.key === subSettingKey && 'active'}`}
               key={item.key}
               onClick={() => handleClick(item.key)}
          >
            {item.label}
          </div>
        ))
      }
    </div>
  )
}
