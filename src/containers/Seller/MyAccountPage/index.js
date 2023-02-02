import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import MyAccountBox from 'components/Seller/MyAccountBox';
import { setGlobalStore } from 'containers/App/actions';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

function WalletPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>My account</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="My account"
        description={`User: ${props.currentUser.username}`}
        currentBreadcrumb="Wallet"
      />
      <div className="page-contents">
        <MyAccountBox currentUser={props.currentUser} setGlobalStore={props.setGlobalStore}/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    currentUser: state.global.currentUser || {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
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
