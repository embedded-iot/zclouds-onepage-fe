import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader,} from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import OrdersHistoryTable from 'components/User/OrdersHistoryTable';

function OrdersHistoryPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Lịch sử đơn hàng</title>
      </Helmet>
      <PageHeader
        title="Lịch sử đơn hàng"
      />
      <div className="page-contents">
        <OrdersHistoryTable products={props.products} />
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
)(OrdersHistoryPage);
