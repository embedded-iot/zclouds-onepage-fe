import React from 'react';
import WalletTotalCards from 'components/Seller/WalletTable/WalletTotalCards';
import TopSellingProductsTable from 'components/Seller/TopSellingProductsTable';
import OrdersOverviewChart from 'components/Seller/OrdersOverviewChart';
import './style.scss';

export default function DashboardBox() {
  return (
    <>
      <WalletTotalCards />
      <OrdersOverviewChart />
      <TopSellingProductsTable />
    </>
  );
}
