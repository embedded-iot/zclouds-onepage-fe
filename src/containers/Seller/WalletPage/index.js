import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import WalletsTable from 'components/Seller/WalletTable';

function WalletPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Wallet</title>
      </Helmet>
      <PageHeader
        title="Wallet"
        description={`User: ${props.currentUser.username}`}
        currentBreadcrumb="Wallet"
      />
      <div className="page-contents">
        <WalletsTable systemConfigs={props.systemConfigs}/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    currentUser: state.global.currentUser || {},
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
)(WalletPage);
