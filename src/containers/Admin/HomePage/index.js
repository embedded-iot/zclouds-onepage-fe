import React from 'react';
import { Helmet } from 'react-helmet';
import NotificationsList from 'components/Admin/NotificationsList';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import DashboardBox from 'components/Admin/DashboardBox';
import DashboardActions from 'components/Admin/DashboardActions';

function HomePage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Notifications management</title>
      </Helmet>
      <PageHeader
        title="Dashboard"
      />
      <div className="page-contents">
        <DashboardActions />
        <NotificationsList isExplain={false} redirectTo={props.push} noData='No notifications'/>
        <DashboardBox />
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
)(HomePage);
