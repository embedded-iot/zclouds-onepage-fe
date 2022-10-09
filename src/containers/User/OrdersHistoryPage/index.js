import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import OrdersHistoryTable from 'components/User/OrdersHistoryTable';
import ProtectedBox from 'components/Share/ProtectedBox';
import PageHeaderBar from 'components/Common/PageHeaderBar';

function OrdersHistoryPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Lịch sử đơn hàng</title>
      </Helmet>
      <PageHeaderBar
        isHome
        goHome={() => props.push('/')}
        title="Lịch sử đơn hàng"
      />
      <div className="page-contents">
        <ProtectedBox redirectTo={props.push}
                      setGlobalStore={props.setGlobalStore}
                      isLogin={props.isLogin}
        >
          <OrdersHistoryTable products={props.products} />
        </ProtectedBox>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    isLogin: state.global.isLogin,
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
