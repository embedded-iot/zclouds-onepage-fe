import React from 'react';
import Sider, { getAllItemsFromGroups } from 'components/Common/Sider';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import { filterListByPermission } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';

export default function AdminSider({ selectedRouters = [], redirectTo = () => {}, }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  // const checkRouterMatchFn = (path) => checkRouterMatch(path, selectedRouters[0]);
  const items = filterListByPermission([
    // getItem('Dashboard', ROUTERS.ROOT, <Icon src={dashboardIcon} activeSrc={dashboardActiveIcon} active={checkRouterMatchFn(ROUTERS.ROOT)} />),
    // getItem('Orders', ROUTERS.ADMIN_ORDERS_MANAGEMENT, <Icon src={ordersIcon} activeSrc={ordersActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_ORDERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_ORDERS)),
    // getItem('Products', ROUTERS.ADMIN_PRODUCTS_MANAGEMENT, <Icon src={productIcon} activeSrc={productActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_PRODUCTS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS)),
    // getItem('Stores', ROUTERS.ADMIN_STORES_MANAGEMENT, <Icon src={storesIcon} activeSrc={storesActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_STORES_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STORES)),
    // getItem('Sellers', ROUTERS.ADMIN_SELLERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SELLERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)),
    // getItem('Users', ROUTERS.ADMIN_USERS_MANAGEMENT, <Icon src={userIcon} activeSrc={userActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_USERS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)),
    // getItem('System settings', ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT, <Icon src={systemSettingIcon} activeSrc={systemSettingActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_SETTINGS_MANAGEMENT)} width={22} height={22}/>, filterListByPermission([
    //   getItem('Configs', ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT, <Icon src={statisticIcon} activeSrc={statisticActiveIcon} active={checkRouterMatchFn(ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT)} />, undefined, undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)),
    // ]), undefined, authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS) || authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)),
  ]);

  const onClick = (e) => {
    redirectTo(e.key);
  };
  return (
    <Sider items={isMobile ? getAllItemsFromGroups(items) : items}
           defaultOpenKeys={[]}
           defaultSelectedKeys={selectedRouters}
           onClick={onClick}
           mode={!isMobile && "inline" }
    />
  );
}
