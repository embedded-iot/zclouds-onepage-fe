import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import PageHeader from 'components/Share/PageHeader';
import TopSellersManagementTable from 'components/Admin/TopSellersManagementTable';
import SellersAccountingManagementChart from 'components/Admin/SellersAccountingManagementChart';

function StatisticsManagementPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Statistics management</title>
      </Helmet>
      <PageHeader
        title="Statistics management"
      />
      <div className="page-contents">
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <SellersAccountingManagementChart />
          </Col>
          <Col span={12}>
            <TopSellersManagementTable />
          </Col>
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    isLogin: state.global.isLogin,
    currentUser: state.global.currentUser || {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
    goBack: () => dispatch(goBack()),
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(StatisticsManagementPage);
