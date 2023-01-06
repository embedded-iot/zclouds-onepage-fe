import React from 'react';
import Sider, { checkRouterMatch, getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';
import Icon from 'components/Common/Icon';
import userIcon from 'images/my-account-icon.png';
import userActiveIcon from 'images/my-account-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import productCategoryActiveIcon from 'images/product-category-icon.png';
import ordersIcon from 'images/paper_black_icon.svg';
import ordersActiveIcon from 'images/paper_black_icon.svg';
import walletIcon from 'images/wallet-icon.png';
import walletActiveIcon from 'images/wallet-icon.png';
import productIcon from 'images/box_black_icon.svg';
import productActiveIcon from 'images/box_black_icon.svg';
import storesIcon from 'images/store_black_icon.svg';
import storesActiveIcon from 'images/store_black_icon.svg';
import transactionIcon from 'images/paper_black_icon_1.svg';
import transactionActiveIcon from 'images/paper_black_icon_1.svg';
import systemAccountingIcon from 'images/layers_black_icon.svg';
import systemAccountingActiveIcon from 'images/layers_black_icon.svg';
import systemSettingIcon from 'images/setting_gray_icon.svg';
import systemSettingActiveIcon from 'images/setting_gray_icon.svg';
import systemNotificationIcon from 'images/bell_gray_icon.svg';
import systemNotificationActiveIcon from 'images/bell_gray_icon.svg';
import bankIcon from 'images/paper_black_icon_2.svg';
import bankActiveIcon from 'images/paper_black_icon_2.svg';
import statisticIcon from 'images/dollar_black_icon.svg';
import statisticActiveIcon from 'images/dollar_black_icon.svg';
import designsLibraryIcon from 'images/designs-library-icon.png';
import designsLibraryActiveIcon from 'images/designs-library-icon.png';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const checkRouterMatchFn = (path) => checkRouterMatch(path, selectedRouters[0]);
  const items = [
    getItem('Orders', ROUTERS.ADMIN_ORDERS_MANAGEMENT, <Icon src={ordersIcon} activeSrc={ordersActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_ORDERS_MANAGEMENT)} />),
    getItem('Products', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={productIcon} activeSrc={productActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_PRODUCTS_MANAGEMENT)} />),
    getItem('Stores', ROUTERS.ADMIN_STORES_MANAGEMENT, <Icon src={storesIcon} activeSrc={storesActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_STORES_MANAGEMENT)} />),
    getItem('Resellers', ROUTERS.ADMIN_SELLERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SELLERS_MANAGEMENT)} />),
    getItem( 'Designs library', ROUTERS.ADMIN_DESIGNS_MANAGEMENT, <Icon src={designsLibraryIcon} activeSrc={designsLibraryActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_DESIGNS_MANAGEMENT)} />),
    getItem('Producer', ROUTERS.ADMIN_PRODUCERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_PRODUCERS_MANAGEMENT)} />),
    getItem('Categories', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT, <Icon src={productCategoryIcon} activeSrc={productCategoryActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_CATEGORIES_MANAGEMENT)} />),
    getItem('Users', ROUTERS.ADMIN_USERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_USERS_MANAGEMENT)} />),
    getItem('System Accounting', ROUTERS.ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT, <Icon src={systemAccountingIcon} activeSrc={systemAccountingActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT)} />, [
      getItem('Statistics', ROUTERS.ADMIN_STATISTICS_MANAGEMENT, <Icon src={statisticIcon} activeSrc={statisticActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_STATISTICS_MANAGEMENT)} />),
      getItem('Transactions', ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT, <Icon src={transactionIcon} activeSrc={transactionActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT)} />),
      getItem('Seller wallets', ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT, <Icon src={walletIcon} activeSrc={walletActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT)} />),
      getItem('Banks', ROUTERS.ADMIN_BANKS_MANAGEMENT, <Icon src={bankIcon} activeSrc={bankActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_BANKS_MANAGEMENT)} />),
    ]),
    getItem('System settings', ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT, <Icon src={systemSettingIcon} activeSrc={systemSettingActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT)} width={22} height={22}/>, [
      getItem('Notifications', ROUTERS.ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT, <Icon src={systemNotificationIcon} activeSrc={systemNotificationActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT)} width={22} height={22} />),
      getItem('Configs', ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT, <Icon src={statisticIcon} activeSrc={statisticActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT)} />),
    ]),
  ];

  const onClick = (e) => {
    redirectTo(e.key);
  };
  return (
    <Sider items={items}
           defaultOpenKeys={[]}
           defaultSelectedKeys={selectedRouters}
           onClick={onClick}
           mode="inline"
    />
  );
}
