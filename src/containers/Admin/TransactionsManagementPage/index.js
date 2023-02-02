import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import TransactionsManagementTable from 'components/Admin/TransactionsManagementTable';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

function TransactionsManagementPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Transactions management</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Transactions management"
      />
      <div className="page-contents">
        <TransactionsManagementTable redirectTo={props.push}/>
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
)(TransactionsManagementPage);
