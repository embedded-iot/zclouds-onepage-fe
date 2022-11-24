import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import { ROUTERS, STORE_TYPE_LABELS } from 'components/contants';
import IntegrationOrdersTable from 'components/Seller/IntegrationOrdersTable';

function IntegrationOrdersPage(props) {
  const [totalCount, setTotalCount] = useState(0);
  const { vendorId, storeId, storeName } = props.match ? props.match.params : {};
  const RELOAD_EVENT_KEY = 'RELOAD_RESELLER_INTEGRATION_ORDERS_TABLE_EVENT_KEY';
  const storeTypeLabel = STORE_TYPE_LABELS[vendorId];
  const breadcrumbRouters = [
    {
      path: ROUTERS.ROOT,
      breadcrumbName: 'Dashboard',
    },
    {
      path: ROUTERS.SELLER_STORES,
      breadcrumbName: 'Integrations',
    },
    {
      breadcrumbName: storeTypeLabel,
    },
    {
      breadcrumbName: storeName,
    },
  ]
  const successCallback = (response) => {
    setTotalCount(response.totalCount || 0);
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{storeTypeLabel}</title>
      </Helmet>
      <PageHeader
        title={`Manual sync ${storeTypeLabel} orders`}
        description={`We found about ${totalCount} related results of your orders`}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <IntegrationOrdersTable redirectTo={props.push}
                                type={vendorId}
                                storeId={storeId}
                                RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
                                successCallback={successCallback}

        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(IntegrationOrdersPage);
