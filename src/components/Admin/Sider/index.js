import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';
import Icon from 'components/Common/Icon';
import myAccountIcon from 'images/my-account-icon.png';
import productCategoryIcon from 'images/product-category-icon.png';
import categoriesIcon from 'images/orders-icon-1.png';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const items = [
    getItem('Products management', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={categoriesIcon} />),
    getItem('Categories management', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT, <Icon src={productCategoryIcon} />),
    getItem('Users management', ROUTERS.ADMIN_ROLES_MANAGEMENT, <Icon src={myAccountIcon} />),
    // getItem('Admins and Roles', ROUTERS.ADMIN_ADMINS_AND_ROLES_MANAGEMENT, undefined, [
    //   getItem('Admins management', ROUTERS.ADMIN_ADMINS_MANAGEMENT),
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
