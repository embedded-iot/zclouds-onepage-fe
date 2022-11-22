import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import { STORE_TYPE_LABELS } from 'components/contants';
import IntegrationOrdersTable from 'components/Seller/IntegrationOrdersTable';

function IntegrationOrdersPage(props) {
  const { vendorId, storeId } = props.match ? props.match.params : {};
  const RELOAD_EVENT_KEY = 'RELOAD_RESELLER_INTEGRATION_ORDERS_TABLE_EVENT_KEY';
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{STORE_TYPE_LABELS[vendorId]}</title>
      </Helmet>
      <PageHeader
        title={`Manual sync ${STORE_TYPE_LABELS[vendorId]} orders`}
      />
      <div className="page-contents">
        <IntegrationOrdersTable redirectTo={props.push}
                     type={vendorId}
                     storeId={storeId}
                     RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
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
