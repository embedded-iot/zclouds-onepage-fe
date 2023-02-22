import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import OrdersTable from 'components/Seller/OrdersTable';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

function OrdersPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [totalCount, setTotalCount] = useState(0);
  const successCallback = (response) => {
    setTotalCount(response.totalCount || 0);
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Orders"
        description={`We found ${totalCount} results.`}
        currentBreadcrumb="Orders"
      />
      <div className="page-contents">
        <OrdersTable redirectTo={props.push}
                     successCallback={successCallback}
                     systemConfigs={props.systemConfigs}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    systemConfigs: state.global.systemConfigs || [],
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
)(OrdersPage);
