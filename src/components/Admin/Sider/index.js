import React from 'react';
import Sider, { checkRouterMatch, getItem } from 'components/Common/Sider';
import { PERMISSION_VALUES, ROUTERS } from 'components/contants';
import Icon from 'components/Common/Icon';
import userIcon from 'images/my-account-icon.png';
import userActiveIcon from 'images/my-account-white-icon.svg';
import productCategoryIcon from 'images/product-category-icon.png';
import productCategoryActiveIcon from 'images/product-category-white-icon.svg';
import ordersIcon from 'images/paper_black_icon.svg';
import ordersActiveIcon from 'images/paper_black_white_icon.svg';
import walletIcon from 'images/wallet-icon.png';
import walletActiveIcon from 'images/wallet-white-icon.svg';
import productIcon from 'images/box_black_icon.svg';
import productActiveIcon from 'images/box_black_white_icon.svg';
import storesIcon from 'images/store_black_icon.svg';
import storesActiveIcon from 'images/stores-white-icon.svg';
import transactionIcon from 'images/paper_black_icon_1.svg';
import transactionActiveIcon from 'images/paper_black_white_icon_1.svg';
import systemAccountingIcon from 'images/layers_black_icon.svg';
import systemAccountingActiveIcon from 'images/layers_black_white_icon.svg';
import systemSettingIcon from 'images/setting_gray_icon.svg';
import systemSettingActiveIcon from 'images/setting_white_icon.svg';
import systemNotificationIcon from 'images/bell_gray_icon.svg';
import systemNotificationActiveIcon from 'images/bell_white_icon.svg';
import bankIcon from 'images/paper_black_icon_2.svg';
import bankActiveIcon from 'images/paper_white_icon_2.svg';
import statisticIcon from 'images/dollar_black_icon.svg';
import statisticActiveIcon from 'images/dollar_white_icon.svg';
import designsLibraryIcon from 'images/designs-library-icon.png';
import designsLibraryActiveIcon from 'images/designs-library-white-icon.svg';
import dashboardIcon from 'images/darhboard-icon.png';
import dashboardActiveIcon from 'images/darhboard-white-icon.svg';
import { filterListByPermission } from 'services/BaseService';
import { authentication } from 'utils';
import {  QuestionCircleOutlined } from '@ant-design/icons';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const checkRouterMatchFn = (path) => checkRouterMatch(path, selectedRouters[0]);
  const items = filterListByPermission([
    getItem('Dashboard', ROUTERS.ROOT, <Icon src={dashboardIcon} activeSrc={dashboardActiveIcon} active={checkRouterMatchFn(ROUTERS.ROOT)} />),
    getItem('Orders', ROUTERS.ADMIN_ORDERS_MANAGEMENT, <Icon src={ordersIcon} activeSrc={ordersActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_ORDERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_ORDERS)),
    getItem('Products', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={productIcon} activeSrc={productActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_PRODUCTS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS)),
    getItem('Stores', ROUTERS.ADMIN_STORES_MANAGEMENT, <Icon src={storesIcon} activeSrc={storesActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_STORES_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STORES)),
    getItem('Sellers', ROUTERS.ADMIN_SELLERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SELLERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)),
    getItem( 'Designs library', ROUTERS.ADMIN_DESIGNS_MANAGEMENT, <Icon src={designsLibraryIcon} activeSrc={designsLibraryActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_DESIGNS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_DESIGNS)),
    getItem('Producer', ROUTERS.ADMIN_PRODUCERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_PRODUCERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCERS)),
    getItem('Categories', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT, <Icon src={productCategoryIcon} activeSrc={productCategoryActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_CATEGORIES_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CATEGORIES)),
    getItem('Users', ROUTERS.ADMIN_USERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_USERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)),
    getItem('System Accounting', ROUTERS.ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT, <Icon src={systemAccountingIcon} activeSrc={systemAccountingActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT)} />, filterListByPermission([
      getItem('Statistics', ROUTERS.ADMIN_STATISTICS_MANAGEMENT, <Icon src={statisticIcon} activeSrc={statisticActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_STATISTICS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STATISTICS)),
      getItem('Transactions', ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT, <Icon src={transactionIcon} activeSrc={transactionActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS)),
      getItem('Seller wallets', ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT, <Icon src={walletIcon} activeSrc={walletActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS)),
      getItem('Banks', ROUTERS.ADMIN_BANKS_MANAGEMENT, <Icon src={bankIcon} activeSrc={bankActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_BANKS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_BANKS)),
    ]), undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STATISTICS) || authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS)
      || authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS) || authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_BANKS)
    ),
    getItem('System settings', ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT, <Icon src={systemSettingIcon} activeSrc={systemSettingActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT)} width={22} height={22}/>, filterListByPermission([
      getItem('Notifications', ROUTERS.ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT, <Icon src={systemNotificationIcon} activeSrc={systemNotificationActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT)} width={22} height={22} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS)),
      getItem('Configs', ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT, <Icon src={statisticIcon} activeSrc={statisticActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)),
      getItem('FAQs', ROUTERS.ADMIN_SYSTEM_FAQS_MANAGEMENT, <QuestionCircleOutlined style={{ marginRight: 14, marginLeft: 3, fontSize: 18, color: checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_FAQS_MANAGEMENT) ? '#fff' : '#626F86' }} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_FAQS)),
    ]), undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS) || authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)),
  ]);

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
