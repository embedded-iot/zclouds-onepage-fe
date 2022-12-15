import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';
import Icon from 'components/Common/Icon';
import userIcon from 'images/my-account-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import ordersIcon from 'images/paper_black_icon.svg';
import walletIcon from 'images/wallet-icon.png';
import productIcon from 'images/box_black_icon.svg';
import storesIcon from 'images/store_black_icon.svg';
import transactionIcon from 'images/paper_black_icon_1.svg';
import systemAccountingIcon from 'images/layers_black_icon.svg';
import bankIcon from 'images/paper_black_icon_2.svg';
import statisticIcon from 'images/dollar_black_icon.svg';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const items = [
    getItem('Orders', ROUTERS.ADMIN_ORDERS_MANAGEMENT, <Icon src={ordersIcon} />),
    getItem('Products', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={productIcon} />),
    getItem('Stores', ROUTERS.ADMIN_STORES_MANAGEMENT, <Icon src={storesIcon} />),
    getItem('Resellers', ROUTERS.ADMIN_SELLERS_MANAGEMENT, <Icon src={userIcon} />),
    getItem('Categories', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT, <Icon src={productCategoryIcon} />),
    getItem('Users', ROUTERS.ADMIN_USERS_MANAGEMENT, <Icon src={userIcon} />),
    getItem('System Accounting', ROUTERS.ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT, <Icon src={systemAccountingIcon} />, [
      getItem('Statistics', ROUTERS.ADMIN_STATISTICS_MANAGEMENT, <Icon src={statisticIcon} />),
      getItem('Transactions', ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT, <Icon src={transactionIcon} />),
      getItem('Seller wallets', ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT, <Icon src={walletIcon} />),
      getItem('Banks', ROUTERS.ADMIN_BANKS_MANAGEMENT, <Icon src={bankIcon} />),
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
