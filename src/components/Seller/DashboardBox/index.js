import React from 'react';
import WalletTotalCards from 'components/Seller/WalletTable/WalletTotalCards';
import TopSellingProductsTable from 'components/Seller/TopSellingProductsTable';
import OrdersOverviewChart from 'components/Seller/OrdersOverviewChart';
import BoxCard from 'components/Share/BoxCard';
import { authentication } from 'utils';
import { PERMISSION_VALUES } from 'components/contants';
import './style.scss';

export default function DashboardBox() {
  return (
    <>
      { authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_WALLET) && <WalletTotalCards />}
      { authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_DASHBOARD) && (
        <BoxCard className="dashboard-box__box-card">
          <OrdersOverviewChart />
          <TopSellingProductsTable />
        </BoxCard>
      )}
    </>
  );
}
