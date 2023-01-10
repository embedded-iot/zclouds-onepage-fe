import React, { useState } from 'react';
import Sider, { checkRouterMatch, getItem } from 'components/Common/Sider';
import {
  PERMISSION_VALUES,
  ROUTERS,
  STORE_TYPE_LABELS,
  STORE_TYPE_VALUES,
  SYSTEM_CONFIG_VALUE,
} from 'components/contants';
import Icon from 'components/Common/Icon';
import dashboardIcon from 'images/darhboard-icon.png';
import dashboardActiveIcon from 'images/darhboard-white-icon.svg';
import ordersIcon from 'images/orders-icon.png';
import ordersActiveIcon from 'images/orders-white-icon.svg';
import designsLibraryIcon from 'images/designs-library-icon.png';
import designsLibraryActiveIcon from 'images/designs-library-white-icon.svg';
import storesIcon from 'images/stores-icon.png';
import storesActiveIcon from 'images/stores-white-icon.svg';
import walletIcon from 'images/wallet-icon.png';
import walletActiveIcon from 'images/wallet-white-icon.svg';
import integrationsIcon from 'images/intergrations-icon.png';
import integrationsActiveIcon from 'images/intergrations-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import productCategoryActiveIcon from 'images/product-category-white-icon.svg';
import chatWithMeIcon from 'images/chat-with-me-icon.png';
import chatWithMeActiveIcon from 'images/chat-with-me-white-icon.svg';
import createrCommunityIcon from 'images/creater-community-icon.png';
import createrCommunityActiveIcon from 'images/creater-community-white-icon.svg';
import { SellerSystemService } from 'services';
import { filterListByPermission } from 'services/BaseService';

import "./style.scss";
import { authentication } from 'utils';

export default function UserSider({ selectedRouters = [], redirectTo = () => {}, systemConfigs = []}) {
  const [selectedKey, setSelectedKey] = useState('');
  const checkRouterMatchFn = (path) => ([ROUTERS.SELLER_CHAT_WITH_ME, ROUTERS.SELLER_CREATOR_COMMUNITY ].includes(selectedKey) === false) && checkRouterMatch(path, selectedRouters[0]);
  const items = filterListByPermission([
    getItem('Dashboard', ROUTERS.ROOT, <Icon src={dashboardIcon} activeSrc={dashboardActiveIcon} active={checkRouterMatchFn(ROUTERS.ROOT)} />),
    getItem('Functions', 'functions', undefined, filterListByPermission([
      getItem('Orders', ROUTERS.SELLER_ORDERS, <Icon src={ordersIcon} activeSrc={ordersActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_ORDERS)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_ORDERS)),
      getItem( 'Designs library', ROUTERS.SELLER_DESIGN_LIBRARY, <Icon src={designsLibraryIcon} activeSrc={designsLibraryActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_DESIGN_LIBRARY)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_DESIGNS)),
      getItem('Stores', ROUTERS.SELLER_STORES, <Icon src={storesIcon} activeSrc={storesActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_STORES)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_STORES)),
      getItem('Wallet', ROUTERS.SELLER_WALLET, <Icon src={walletIcon} activeSrc={walletActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_WALLET)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_WALLET)),
      getItem('Integrations', ROUTERS.SELLER_INTEGRATIONS, <Icon src={integrationsIcon} activeSrc={integrationsActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_INTEGRATIONS)} />, [
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOPIFY], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.SHOPIFY),
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOP_BASE], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.SHOP_BASE),
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.WOO_COMMERCE], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.WOO_COMMERCE),
      ], undefined, authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_STORE)),
    ])),
    getItem('Help', 'help', undefined, filterListByPermission([
      getItem('Product categories', ROUTERS.SELLER_PRODUCT_CATEGORY, <Icon src={productCategoryIcon} activeSrc={productCategoryActiveIcon} active={checkRouterMatchFn(ROUTERS.SELLER_PRODUCT_CATEGORY)} />),
      getItem('Chat with me', ROUTERS.SELLER_CHAT_WITH_ME, <Icon src={chatWithMeIcon} activeSrc={chatWithMeActiveIcon} active={selectedKey === ROUTERS.SELLER_CHAT_WITH_ME} />),
      getItem('Creator community', ROUTERS.SELLER_CREATOR_COMMUNITY, <Icon src={createrCommunityIcon} activeSrc={createrCommunityActiveIcon} active={selectedKey === ROUTERS.SELLER_CREATOR_COMMUNITY} />),
    ])),
  ]);
  const defaultOpenKeys = items.map(item => item.key);

  const onClick = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case ROUTERS.SELLER_CHAT_WITH_ME:
        window.open(SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_CHAT_WITH_ME), '_blank');
        break;
      case ROUTERS.SELLER_CREATOR_COMMUNITY:
        window.open(SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_CREATOR_COMMUNITY),'_blank');
        break;
      default:
        redirectTo(e.key);
    }
  };
  return (
    <Sider items={items}
           defaultOpenKeys={defaultOpenKeys}
           defaultSelectedKeys={selectedRouters}
           onClick={onClick}
           className="seller-sider__wrapper"
           mode="inline"
    />
  );
}
