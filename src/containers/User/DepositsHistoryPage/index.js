import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader,} from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DepositHistoryTable from 'components/User/DepositHistoryTable';

function DepositsHistoryPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Lịch sử đơn nạp</title>
      </Helmet>
      <PageHeader
        title="Lịch sử đơn nạp"
      />
      <div className="page-contents">
        <DepositHistoryTable />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    currentUser: state.global.currentUser || {},
    products: state.global.products,
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
)(DepositsHistoryPage);
