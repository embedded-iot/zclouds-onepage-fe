import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';
import Icon from 'components/Common/Icon';
import myAccountIcon from 'images/my-account-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import categoriesIcon from 'images/orders-icon-1.png';
import ordersIcon from 'images/paper_black_icon.svg';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const items = [
    getItem('Products', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={categoriesIcon} />),
    getItem('Categories', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT, <Icon src={productCategoryIcon} />),
    getItem('Orders', ROUTERS.ADMIN_ORDERS_MANAGEMENT, <Icon src={ordersIcon} />),
    getItem('Users', ROUTERS.ADMIN_USERS_MANAGEMENT, <Icon src={myAccountIcon} />),
    getItem('Transactions', ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT, <Icon src={ordersIcon} />),
    getItem('Seller wallets', ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT, <Icon src={myAccountIcon} />),
    // getItem('Admins and Roles', ROUTERS.ADMIN_USER_AND_ROLES_MANAGEMENT, undefined, [
    //   getItem('Admins management', ROUTERS.ADMIN_USERS_MANAGEMENT),
    //   getItem( 'Roles management', ROUTERS.ADMIN_ROLES_MANAGEMENT),
    // ]),
  ];
  const defaultOpenKeys = items.map(item => item.key);

  const onClick = (e) => {
    redirectTo(e.key);
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
