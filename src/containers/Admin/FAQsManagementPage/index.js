import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import FAQsManagementTable from 'components/Admin/FAQsManagementTable';

function FAQsManagementPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>FQAs management</title>
      </Helmet>
      <PageHeader
        title="FQAs management"
      />
      <div className="page-contents">
        <FAQsManagementTable />
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
)(FAQsManagementPage);
