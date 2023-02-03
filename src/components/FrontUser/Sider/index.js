import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import "./style.scss";

export default function PublicSider({ selectedRouters = [], redirectTo = () => {} }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const items = [
    getItem('Home', ROUTERS.ROOT),
    getItem('All Products', ROUTERS.FRONT_USER_ALL_PRODUCTS),
    getItem( 'SKU', ROUTERS.FRONT_USER_SKU),
    getItem( 'Blogs', ROUTERS.FRONT_USER_BLOGS),
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
           mode={!isMobile && "horizontal" }
    />
  );
}
