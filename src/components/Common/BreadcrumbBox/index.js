import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

const BreadcrumbBox = ({ routes = [], absolutePath = true }) => {

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={(absolutePath && '/') + paths.join('/')}>{route.breadcrumbName}</Link>
    );
  }
  return (
    <Breadcrumb className="breadcrumb-box__wrapper"
                itemRender={itemRender}
                routes={routes}
    />
  )
}


export default BreadcrumbBox;
