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
import { RESPONSIVE_MEDIAS, ROUTERS, STORE_TYPE_LABELS } from 'components/contants';

import "./style.scss";
import { useMediaQuery } from 'react-responsive';

function IntegrationsPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
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
        className={isMobile && 'box-card--mobile'}title={`Connect your ${storeTypeLabel} Store`}
        description={`You can import orders, products and customers automatic. Your ${storeTypeLabel} store content will constant.`}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <Row gutter={isMobile ? [0, 8] : [16, 16]}>
          <Col span={isMobile ? 24 : 10}>
            <IntegrationsStore type={vendorId}
                               storeTypeLabel={storeTypeLabel}
                               systemConfigs={props.systemConfigs}
                               onFinish={handleReloadStoresTable}
            />
          </Col>
          <Col span={isMobile ? 24 : 14} className={!isMobile && 'integrations-page__store-table'}>
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
)(IntegrationsPage);
