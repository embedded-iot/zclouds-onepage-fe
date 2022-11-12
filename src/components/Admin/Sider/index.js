import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const items = [
    getItem('Products management', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT),
    getItem('Categories management', ROUTERS.ADMIN_CATEGORIES_MANAGEMENT),
    getItem('Roles management', ROUTERS.ADMIN_ROLES_MANAGEMENT)
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
