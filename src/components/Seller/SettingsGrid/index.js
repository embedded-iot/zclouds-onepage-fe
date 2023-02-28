import React from 'react';
import GridView from 'components/Common/GridView';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS, SETTING_KEY_VALUES, SETTING_LABEL_VALUES } from 'components/contants';
import Icon from 'components/Common/Icon';
import settingIcon from 'images/settings_icon.svg';
import paymentIcon from 'images/payment_icon.svg';
import sellerIcon from 'images/user_icon.svg';
import emailIcon from 'images/email_icon.svg';
import smsIcon from 'images/sms_icon.svg';
import legalIcon from 'images/legal_icon.svg';
import billingIcon from 'images/billing_icon.svg';
import userAndPermissionsIcon from 'images/user_icon.svg';
import appIcon from 'images/iphone_icon.svg';
import storeFrontIcon from 'images/basket_icon.svg';
import fulfillmentIcon from 'images/light_icon.svg';
import discountsIcon from 'images/banknote_icon.svg';

import './style.scss';

const gridItemTemplate = ({ item }) => {
  return (
    <div className='settings-grid__item'>
      <div className='settings-grid__icon'>
        <Icon src={item.icon} width={46} height={46} />
      </div>
      <div className='settings-grid__contents'>
        <div className='settings-grid__title'>{item.title}</div>
        <div className='settings-grid__description'>{item.description}</div>
      </div>
    </div>
  )
}

export default function SettingsGrid({ redirectTo = () => {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const configs = {
    gutter: isMobile ? [0, 20] : [20, 20],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 24 || isExTablet && 12 || 8,
    gridItemTemplate: gridItemTemplate,
  }

  const onSelectGridItem = (selectItem) => {
    redirectTo(ROUTERS.SELLER_SETTINGS + '/' + selectItem.key);
  }

  const items = [
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.GENERAL],
      description: 'General setting',
      icon: settingIcon,
      key: SETTING_KEY_VALUES.GENERAL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.PAYMENTS],
      description: 'Enable and manage your store’s payment providers',
      icon: paymentIcon,
      key: SETTING_KEY_VALUES.GENERAL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.SELLERS],
      description: 'Manage seller can create store',
      icon: sellerIcon,
      key: SETTING_KEY_VALUES.SELLERS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.EMAIL],
      description: 'Manage email support & template',
      icon: emailIcon,
      key: SETTING_KEY_VALUES.EMAIL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.SMS],
      description: 'Manage sms & template',
      icon: smsIcon,
      key: SETTING_KEY_VALUES.SMS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.LEGAL],
      description: 'Manage your legal page on sellpage',
      icon: legalIcon,
      key: SETTING_KEY_VALUES.LEGAL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.BILLING],
      description: 'Manage your billing info and view your invoices',
      icon: billingIcon,
      key: SETTING_KEY_VALUES.BILLING,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.USER_AND_PERMISSIONS],
      description: 'Manage what users can see or doing',
      icon: userAndPermissionsIcon,
      key: SETTING_KEY_VALUES.USER_AND_PERMISSIONS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.APPS],
      description: 'Manage your integrate app',
      icon: appIcon,
      key: SETTING_KEY_VALUES.APPS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.STOREFRONT],
      description: 'Manage storefront',
      icon: storeFrontIcon,
      key: SETTING_KEY_VALUES.STOREFRONT,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.FULFILLMENT],
      description: 'Manage how you fulfillment orders to customer',
      icon: fulfillmentIcon,
      key: SETTING_KEY_VALUES.FULFILLMENT,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.DISCOUNTS],
      description: 'Manage discounts',
      icon: discountsIcon,
      key: SETTING_KEY_VALUES.DISCOUNTS,
    },
  ]

  return (
    <GridView
      gutter={configs.gutter}
      colSpan={configs.colSpan}
      isAllowSelection={false}
      dataSource={items}
      gridItemTemplate={configs.gridItemTemplate}
      onSelectGridItem={onSelectGridItem}
      className={configs.className}
    />
  )
}
