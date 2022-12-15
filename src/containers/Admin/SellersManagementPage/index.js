import React from 'react';
import { Helmet } from 'react-helmet';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import SellersManagementTable from 'components/Admin/SellersManagementTable';

function SellersManagementPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Resellers management</title>
      </Helmet>
      <PageHeader
        title="Resellers management"
      />
      <div className="page-contents">
        <SellersManagementTable />
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
)(SellersManagementPage);
