/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';

import UsersPage from 'containers/User/UsersPage/Loadable';
import AdminsPage from 'containers/Admin/AdminsPage/Loadable';
import LoginPage from 'containers/Common/LoginPage/Loadable';
import RegisterPage from 'containers/Common/RegisterPage/Loadable';
import ForgotAccountPage from 'containers/Common/ForgotAccountPage/Loadable';
import AccountInfoPage from 'containers/Common/AccountInfoPage/Loadable';

import Header from 'components/Share/Layout/Header';
import Footer from 'components/Share/Layout/Footer';
import UserSider from 'components/User/UserSider';
import AdminSider from 'components/Admin/AdminSider';
import LayoutWrapper from 'components/Share/Layout/LayoutWapper';
import { WEBSITE_NAME } from 'components/contants';

import './style.scss';



const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const AppContent = (props) => (
  <Switch>
    <Route exact path="/" component={UsersPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/forgot-account" component={ForgotAccountPage} />
    <Route exact path="/account-info" component={AccountInfoPage} />
    <Route exact path="/guest" component={UsersPage} />
    <Route exact path="/cms" component={AdminsPage} />
  </Switch>
)

const App = (props) => {
  const redirectTo = path => {
    props.push(path);
  }
  const signOut = () => {
    props.setGlobalStore({
      isLogin: false,
      isAdmin: false,
      currentUser: null,
    })
  }
  return (
    <AppWrapper>
      <Helmet
        titleTemplate={`%s - ${WEBSITE_NAME}`}
        defaultTitle={`${WEBSITE_NAME}`}
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <LayoutWrapper header={(
                        <Header logoName={WEBSITE_NAME}
                                isLogin={props.isLogin}
                                currentUser={props.currentUser}
                                redirectTo={redirectTo}
                                signOut={signOut}
                        />
                      )}
                     sider={ props.isAdmin ? <AdminSider /> : <UserSider /> }
                     content={<AppContent />}
                     footer={<Footer />}
      />
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isLogin, isAdmin, currentUser } = state.global;
  return {
    isLogin,
    isAdmin,
    currentUser,
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
  withRouter,
  withConnect,
  memo,
)(App);
