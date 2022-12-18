import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS, STORE_TYPE_LABELS, STORE_TYPE_VALUES } from 'components/contants';
import Icon from 'components/Common/Icon';
import dashboardIcon from 'images/darhboard-icon.png';
import ordersIcon from 'images/orders-icon.png';
import designsLibraryIcon from 'images/designs-library-icon.png';
// import designsSkuIcon from 'images/designs-sku-icon.png';
// import designFromOrderIcon from 'images/designs-from-order-icon.png';
import myAccountIcon from 'images/my-account-icon.png';
import storesIcon from 'images/stores-icon.png';
import walletIcon from 'images/wallet-icon.png';
import integrationsIcon from 'images/intergrations-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import ticketsIcon from 'images/tickets-icon.png';
import chatWithMeIcon from 'images/chat-with-me-icon.png';
import createrCommunityIcon from 'images/creater-community-icon.png';

import "./style.scss";

export default function UserSider({ selectedRouters = [], redirectTo = () => {}, setGlobalStore = () => {} }) {
  const items = [
    getItem('DASHBOARD', ROUTERS.ROOT, <Icon src={dashboardIcon} />),
    getItem('Functions', 'functions', undefined, [
      getItem('Orders', ROUTERS.SELLER_ORDERS, <Icon src={ordersIcon} />),
      getItem( 'Designs library', ROUTERS.SELLER_DESIGN_LIBRARY, <Icon src={designsLibraryIcon} />),
      getItem('My Account', ROUTERS.SELLER_MY_ACCOUNT, <Icon src={myAccountIcon} />),
      getItem('Stores', ROUTERS.SELLER_STORES, <Icon src={storesIcon} />),
      getItem('Wallet', ROUTERS.SELLER_WALLET, <Icon src={walletIcon} />),
      getItem('Integrations', ROUTERS.SELLER_INTEGRATIONS, <Icon src={integrationsIcon} />, [
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOPIFY], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.SHOPIFY),
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOP_BASE], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.SHOP_BASE),
        getItem(STORE_TYPE_LABELS[STORE_TYPE_VALUES.WOO_COMMERCE], ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.WOO_COMMERCE),
      ]),
    ]),
    getItem('Help', 'help', undefined, [
      getItem('Product category', ROUTERS.SELLER_PRODUCT_CATEGORY, <Icon src={productCategoryIcon} />),
      getItem( 'Tickets', ROUTERS.SELLER_TICKETS, <Icon src={ticketsIcon} />),
      getItem('Chat with me', ROUTERS.SELLER_CHAT_WITH_ME, <Icon src={chatWithMeIcon} />),
      getItem('Creator community', ROUTERS.SELLER_CREATOR_COMMUNITY, <Icon src={createrCommunityIcon} />),
    ]),
  ];
  const defaultOpenKeys = items.map(item => item.key);

  const onClick = (e) => {
    switch (e.key) {
      case ROUTERS.SELLER_CHAT_WITH_ME:
        window.open('https://www.facebook.com/FanpageLike68/?ref=website', '_blank');
        break;
      case ROUTERS.SELLER_CREATOR_COMMUNITY:
        window.open('https://www.facebook.com/mr.QuocDoan','_blank');
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
