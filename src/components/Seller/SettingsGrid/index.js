import React from 'react';
import GridView from 'components/Common/GridView';
import { useMediaQuery } from 'react-responsive';
import {
  RESPONSIVE_MEDIAS,
  ROUTERS,
  SETTING_ICON,
  SETTING_KEY_VALUES,
  SETTING_LABEL_VALUES,
} from 'components/contants';
import Icon from 'components/Common/Icon';
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
      icon: SETTING_ICON[SETTING_KEY_VALUES.GENERAL],
      key: SETTING_KEY_VALUES.GENERAL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.PAYMENTS],
      description: 'Enable and manage your store’s payment providers',
      icon: SETTING_ICON[SETTING_KEY_VALUES.PAYMENTS],
      key: SETTING_KEY_VALUES.PAYMENTS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.SELLERS],
      description: 'Manage seller can create store',
      icon: SETTING_ICON[SETTING_KEY_VALUES.SELLERS],
      key: SETTING_KEY_VALUES.SELLERS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.EMAIL],
      description: 'Manage email support & template',
      icon: SETTING_ICON[SETTING_KEY_VALUES.EMAIL],
      key: SETTING_KEY_VALUES.EMAIL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.SMS],
      description: 'Manage sms & template',
      icon: SETTING_ICON[SETTING_KEY_VALUES.SMS],
      key: SETTING_KEY_VALUES.SMS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.LEGAL],
      description: 'Manage your legal page on sellpage',
      icon: SETTING_ICON[SETTING_KEY_VALUES.LEGAL],
      key: SETTING_KEY_VALUES.LEGAL,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.BILLING],
      description: 'Manage your billing info and view your invoices',
      icon: SETTING_ICON[SETTING_KEY_VALUES.BILLING],
      key: SETTING_KEY_VALUES.BILLING,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.USER_AND_PERMISSIONS],
      description: 'Manage what users can see or doing',
      icon: SETTING_ICON[SETTING_KEY_VALUES.USER_AND_PERMISSIONS],
      key: SETTING_KEY_VALUES.USER_AND_PERMISSIONS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.APPS],
      description: 'Manage your integrate app',
      icon: SETTING_ICON[SETTING_KEY_VALUES.APPS],
      key: SETTING_KEY_VALUES.APPS,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.STOREFRONT],
      description: 'Manage storefront',
      icon: SETTING_ICON[SETTING_KEY_VALUES.STOREFRONT],
      key: SETTING_KEY_VALUES.STOREFRONT,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.FULFILLMENT],
      description: 'Manage how you fulfillment orders to customer',
      icon: SETTING_ICON[SETTING_KEY_VALUES.FULFILLMENT],
      key: SETTING_KEY_VALUES.FULFILLMENT,
    },
    {
      title: SETTING_LABEL_VALUES[SETTING_KEY_VALUES.DISCOUNTS],
      description: 'Manage discounts',
      icon: SETTING_ICON[SETTING_KEY_VALUES.DISCOUNTS],
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
