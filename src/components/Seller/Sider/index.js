import React, { useState } from 'react';
import Sider, { checkRouterMatch, getAllItemsFromGroups, getItem } from 'components/Common/Sider';
import {
  PERMISSION_VALUES, RESPONSIVE_MEDIAS,
  ROUTERS,
  SYSTEM_CONFIG_VALUE,
} from 'components/contants';
import Icon from 'components/Common/Icon';
import dashboardIcon from 'images/home_icon.svg';
import dashboardActiveIcon from 'images/home_white_icon.svg';
import ordersIcon from 'images/cart_icon.svg';
import ordersActiveIcon from 'images/cart_white_icon.svg';
import productIcon from 'images/tag_icon.svg';
import productActiveIcon from 'images/tag_white_icon.svg';
import analyticIcon from 'images/trending_up_icon.svg';
import analyticActiveIcon from 'images/trending_up_white_icon.svg';
import settingsIcon from 'images/wrench_icon.svg';
import settingsActiveIcon from 'images/wrench_white_icon.svg';
import { SellerSystemService } from 'services';
import { filterListByPermission } from 'services/BaseService';
import { authentication } from 'utils';
import { useMediaQuery } from 'react-responsive';

import "./style.scss";

export default function UserSider({ selectedRouters = [], redirectTo = () => {}, systemConfigs = []}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [selectedKey, setSelectedKey] = useState('');
  const checkRouterMatchFn = (path) => ([ROUTERS.SELLER_STORES ].includes(selectedKey) === false) && checkRouterMatch(path, selectedRouters[0]);
  const items = filterListByPermission([
    getItem('Home', ROUTERS.ROOT, <Icon src={dashboardIcon} activeSrc={dashboardActiveIcon} active={checkRouterMatchFn(ROUTERS.ROOT)} />),
    getItem('Orders', ROUTERS.SELLER_ORDERS, <Icon src={ordersIcon} activeSrc={ordersActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_ORDERS)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_ORDERS)),
    getItem( 'Products', ROUTERS.SELLER_PRODUCTS, <Icon src={productIcon} activeSrc={productActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_PRODUCTS)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_PRODUCTS)),
    getItem('Analytics', ROUTERS.SELLER_ANALYTICS, <Icon src={analyticIcon} activeSrc={analyticActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_ANALYTICS)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_ANALYTICS)),
    getItem('Settings', ROUTERS.SELLER_SETTINGS, <Icon src={settingsIcon} activeSrc={settingsActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_SETTINGS)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_SETTINGS)),
  ]);
  const defaultOpenKeys = items.map(item => item.key);

  const onClick = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case ROUTERS.SELLER_HELP:
        window.open(SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_HELP)
          || 'https://heady-axolotl-19b.notion.site/OneNext-Document-T5-2022-63beff985b4149ed962f8e2997344053', '_blank');
        break;
      default:
        redirectTo(e.key);
    }
  };

  return (
    <div className="seller-sider__wrapper">
      <Sider items={isMobile ? getAllItemsFromGroups(items) : items}
             defaultOpenKeys={defaultOpenKeys}
             defaultSelectedKeys={selectedRouters}
             onClick={onClick}
             className={!isMobile && 'seller-sider__sider'}
             mode={!isMobile && "inline" }
      />
      <div className="seller-sider__footer">
        { authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_STORES) && (
          <span className="link" >Manage stores</span>
        )}
        <span className="link" onClick={() => onClick({ key: ROUTERS.SELLER_HELP })}>Help</span>
      </div>
    </div>
  );
}
