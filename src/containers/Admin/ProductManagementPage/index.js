import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import ProductsManagementTable from 'components/Admin/ProductsManagementTable';

function ProductManagementPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Products management</title>
      </Helmet>
      <PageHeader
        title="Products management"
      />
      <div className="page-contents">
        <ProductsManagementTable redirectTo={props.push} />
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
)(ProductManagementPage);
