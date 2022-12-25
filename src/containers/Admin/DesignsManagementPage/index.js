import React from 'react';
import { Helmet } from 'react-helmet';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import DesignsManagementTable from 'components/Admin/DesignsManagementTable';

function DesignsManagementPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Designs management</title>
      </Helmet>
      <PageHeader
        title="Designs management"
      />
      <div className="page-contents">
        <DesignsManagementTable />
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
)(DesignsManagementPage);
