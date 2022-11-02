import React from 'react';
import Sider, { getItem } from 'components/Share/Layout/Sider';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import "./style.scss";

export default function PublicSider({ selectedRouters = [], redirectTo = () => {} }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const items = [
    getItem('Trang chủ', ROUTERS.ROOT),
    getItem('Sản phẩm', ROUTERS.CATEGORIES),
    getItem( 'SKU', ROUTERS.SKU),
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
