import React from 'react';
import Icon from 'components/Common/Icon';
import backIcon from 'images/arrow_left_icon_1.svg';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import { ROUTERS, SETTING_ICON, SETTING_KEY_VALUES } from 'components/contants';
import SettingSubSiderBox from 'components/Seller/SettingDetailBox/SettingSubSiderBox';

import './style.scss';

export default function SettingSiderBox({ settingKey = '', subSettingKey = '', title = '', breadcrumbRouters = [], redirectTo = () => {},  }) {
  const settingIcon = SETTING_ICON[settingKey];
  return (
    <div className='setting-sibar-box__wrapper'>
      <div className='setting-sibar-box__back'>
        <Icon src={backIcon} className="cursor-pointer" onClick={() => redirectTo(ROUTERS.SELLER_SETTINGS)} />
        <span className="setting-sibar-box__back-title">Back</span>
      </div>
      <BreadcrumbBox routes={breadcrumbRouters} className="setting-sibar-box__breadcrumb"/>
      <div className='setting-sibar-box__header'>
        <Icon src={settingIcon} />
        <span className="setting-sibar-box__title">{title}</span>
      </div>
      <div className='setting-sibar-box__divider' />
      {
        settingKey === SETTING_KEY_VALUES.GENERAL && (
          <SettingSubSiderBox
            settingKey={settingKey}
            subSettingKey={subSettingKey}
            redirectTo={redirectTo}
          />
        )
      }
    </div>
  )
}
