import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import WalletTransactionsManagementTable from 'components/Admin/WalletTransactionsManagementTable';
import arrowLeftIcon from 'images/arrow_left_icon.svg';
import Icon from 'components/Common/Icon';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';

function WalletTransactionsManagementPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const sellerId = parseInt(props.match.params.sellerId);
  const pageDescription = `Seller ID: ${sellerId}`;
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Wallet transactions management</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="View Wallet Details"
        description={pageDescription}
      />
      <div className="page-contents">
        <Icon src={arrowLeftIcon} width={24} height={24} className="cursor-pointer wallet-transaction-management__back-button" onClick={props.goBack} />
        <WalletTransactionsManagementTable sellerId={sellerId}/>
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
)(WalletTransactionsManagementPage);
