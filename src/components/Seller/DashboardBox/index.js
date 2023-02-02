import React from 'react';
import WalletTotalCards from 'components/Seller/WalletTable/WalletTotalCards';
import TopSellingProductsTable from 'components/Seller/TopSellingProductsTable';
import OrdersOverviewChart from 'components/Seller/OrdersOverviewChart';
import BoxCard from 'components/Share/BoxCard';
import { authentication } from 'utils';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import './style.scss';

export default function DashboardBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <>
      { authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_WALLET) && <WalletTotalCards />}
      { authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_DASHBOARD) && isMobile ? (
        <>
          <div className='box-card--mobile'>
            <OrdersOverviewChart />
          </div>
          <div className='box-card--mobile'>
            <TopSellingProductsTable />
          </div>
        </>
      ) : (
        <BoxCard className="dashboard-box__box-card">
          <OrdersOverviewChart />
          <TopSellingProductsTable />
        </BoxCard>
      )}
    </>
  );
}
