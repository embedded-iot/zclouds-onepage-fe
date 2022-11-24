import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import OrdersTable from 'components/Seller/OrdersTable';

function OrdersPage(props) {
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
        title="Orders"
        description={`We found ${totalCount} results.`}
        currentBreadcrumb="Orders"
      />
      <div className="page-contents">
        <OrdersTable redirectTo={props.push}
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
)(OrdersPage);
