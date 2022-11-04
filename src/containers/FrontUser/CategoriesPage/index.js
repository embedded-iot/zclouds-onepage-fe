import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import CategoriesGrid from 'components/FrontUser/CategoriesGrid';

function CategoriesPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <PageHeader
        title="Products List"
        description="Lenful is a Print-on-demand solution that helps you build a profitable online business. Start a business, with everything you need all in one place."
      />
      <div className="page-contents">
        <CategoriesGrid />
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
)(CategoriesPage);
