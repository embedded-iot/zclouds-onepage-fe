import React from 'react';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import { ROUTERS } from 'components/contants';
import './style.scss';

export default function PageHeader({ className, title, description, currentBreadcrumb = '', breadcrumbRouters = []}) {
  const showBreadcrumb = !!currentBreadcrumb || breadcrumbRouters.length;
  const routers = [
    ...(!!currentBreadcrumb ? [
      {
        path: ROUTERS.ROOT,
        breadcrumbName: 'Dashboard',
      },
      {
        breadcrumbName: currentBreadcrumb,
      },
    ] : []),
    ...breadcrumbRouters,
  ];
  return (
    <div className={`box-header__wrapper ${className}`}>
      <div className='box-header__title'>{title}</div>
      <div className='box-header__description'>{description}</div>
      {
        !!showBreadcrumb && (
          <BreadcrumbBox routes={routers} className="box-header__breadcrumb"/>
        )
      }
    </div>
  )
}
