import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';

import "./style.scss";

export default function UserSider({ selectedRouters = [], redirectTo = () => {}, setGlobalStore = () => {} }) {
  const items = [
    getItem('DASHBOARD', ROUTERS.ROOT),
    getItem('Functions', 'functions', undefined, [
      getItem('Orders', ROUTERS.SELLER_ORDERS),
      getItem( 'Designs library', ROUTERS.SELLER_DESIGN_LIBRARY),
      getItem('My Account', ROUTERS.SELLER_MY_ACCOUNT),
      getItem('Stores', ROUTERS.SELLER_STORES),
      getItem('Wallet', ROUTERS.SELLER_WALLET),
      getItem('Integrations', ROUTERS.SELLER_INTEGRATIONS),
    ]),
    getItem('Help', 'help', undefined, [
      getItem('Product category', ROUTERS.SELLER_PRODUCT_CATEGORY),
      getItem( 'Tickets', ROUTERS.SELLER_TICKETS),
      getItem('Chat with me', ROUTERS.SELLER_CHAT_WITH_ME),
      getItem('Creator community', ROUTERS.SELLER_CREATOR_COMMUNITY),
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
           mode="inline"
    />
  );
}
