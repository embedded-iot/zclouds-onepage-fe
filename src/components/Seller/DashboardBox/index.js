import React from 'react';
import WalletTotalCards from 'components/Seller/WalletTable/WalletTotalCards';
import TopSellingProductsTable from 'components/Seller/TopSellingProductsTable';
import OrdersOverviewChart from 'components/Seller/OrdersOverviewChart';
import BoxCard from 'components/Share/BoxCard';
import './style.scss';

export default function DashboardBox() {
  return (
    <>
      <WalletTotalCards />
      <BoxCard className="dashboard-box__box-card">
        <OrdersOverviewChart />
        <TopSellingProductsTable />
      </BoxCard>
    </>
  );
}
