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
import { STORE_TYPE_LABELS } from 'components/contants';

function IntegrationsPage(props) {
  const { vendorId } = props.match ? props.match.params : {};
  const RELOAD_EVENT_KEY = 'RELOAD_RESELLER_INTEGRATION_STORES_TABLE_EVENT_KEY';
  const handleReloadStoresTable = () => {
    events.publish(RELOAD_EVENT_KEY, {});
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{STORE_TYPE_LABELS[vendorId]}</title>
      </Helmet>
      <PageHeader
        title={`Connect your ${STORE_TYPE_LABELS[vendorId]} Store`}
      />
      <div className="page-contents">
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <IntegrationsStore type={vendorId}
                               onFinish={handleReloadStoresTable}
            />
          </Col>
          <Col span={16}>
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
