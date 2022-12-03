import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import StoresTable from 'components/Seller/StoresTable';
import IntegrationsStore from 'components/Seller/IntegrationsStore';
import { events } from 'utils';
import { Col, Row } from 'antd';
import { ROUTERS, STORE_TYPE_LABELS } from 'components/contants';

import "./style.scss";

function IntegrationsPage(props) {
  const { vendorId } = props.match ? props.match.params : {};
  const RELOAD_EVENT_KEY = 'RELOAD_RESELLER_INTEGRATION_STORES_TABLE_EVENT_KEY';
  const storeTypeLabel = STORE_TYPE_LABELS[vendorId];
  const handleReloadStoresTable = () => {
    events.publish(RELOAD_EVENT_KEY, {});
  }
  const breadcrumbRouters = [
    {
      path: ROUTERS.ROOT,
      breadcrumbName: 'Dashboard',
    },
    {
      path: ROUTERS.SELLER_STORES,
      breadcrumbName: 'Stores',
    },
    {
      breadcrumbName: storeTypeLabel,
    },
  ]
  return (
    <div className="page-wrapper integrations-page__wrapper">
      <Helmet>
        <title>{storeTypeLabel}</title>
      </Helmet>
      <PageHeader
        title={`Connect your ${storeTypeLabel} Store`}
        description={`You can import orders, products and customers automatic. Your ${storeTypeLabel} store content will constant.`}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <IntegrationsStore type={vendorId}
                               storeTypeLabel={storeTypeLabel}
                               onFinish={handleReloadStoresTable}
            />
          </Col>
          <Col span={14} className="integrations-page__store-table">
            <StoresTable redirectTo={props.push}
                         type={vendorId}
                         RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
            />
          </Col>
        </Row>
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
)(IntegrationsPage);
