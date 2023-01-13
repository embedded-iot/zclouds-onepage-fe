import React from 'react';
import TopSellingProductsTable from 'components/Admin/TopSellingProductsTable';
import BoxCard from 'components/Share/BoxCard';
import { authentication } from 'utils';
import { PERMISSION_VALUES } from 'components/contants';
import './style.scss';

export default function DashboardBox() {
  return (
    <>
      { authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_DASHBOARD) && (
        <BoxCard className="dashboard-box__box-card">
          <TopSellingProductsTable />
        </BoxCard>
      )}
    </>
  );
}
