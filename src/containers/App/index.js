/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';
import { BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';
import { authentication } from 'utils';

import Header from 'components/Share/Header';

import LayoutWrapper from 'components/Share/Layout/LayoutWapper';
import PublicLayoutWrapper from 'components/Share/Layout/PublicLayoutWapper';


import FrontUserHeader from 'components/FrontUser/Header';
import FrontUserFooter from 'components/FrontUser/Footer';
import FrontUserSider from 'components/FrontUser/Sider';

import SellerSider from 'components/Seller/Sider';
import AdminSider from 'components/Admin/Sider';


import LoginPage from 'containers/Common/LoginPage/Loadable';
import RegisterPage from 'containers/Common/RegisterPage/Loadable';

import FrontUserHomePage from 'containers/FrontUser/HomePage/Loadable';
import SellerHomePage from 'containers/Seller/HomePage/Loadable';
import AdminHomePage from 'containers/Admin/HomePage/Loadable';


import { RESPONSIVE_MEDIAS, ROUTERS, WEBSITE_NAME } from 'components/contants';

import { UserService } from 'services';


import './style.scss';



const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const PrivateRoute = (props) => {
  const { isAuthenticated, ...restProps } = props;
  if (!isAuthenticated)
    return (
      <Redirect
        to={{
          pathname: ROUTERS.LOGIN,
          search: `?redirect=${props.location.pathname}`,
        }}
      />
    );
  return (<Route {...restProps} />)
}

const PublicAppContent = (props) => (
  <Switch>
    <Route exact path={ROUTERS.ROOT} component={FrontUserHomePage} />
    <Route exact path={ROUTERS.LOGIN} component={LoginPage} />
    <Route exact path={ROUTERS.REGISTER} component={RegisterPage} />
  </Switch>
)

const AppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.ROOT} component={SellerHomePage} isAuthenticated={props.isLogin}/>
  </Switch>
)

const AdminAppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.ROOT} component={AdminHomePage} isAuthenticated={props.isLogin && props.isAdmin}/>
  </Switch>
)

const App = (props) => {
  const [isLoadedCheckLogin, setIsLoadedCheckLogin] = useState(false);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const backdropPosition = isMobile ? 40 : 23;
  const redirectTo = path => {
    props.push(path);
  }
  const signOut = () => {
    authentication.clearToken();
    props.setGlobalStore({
      isLogin: false,
      isAdmin: false,
      currentUser: {},
    })
    props.push(ROUTERS.ROOT);
  }

  const restoreLoginPreviousSection = () => {
    UserService.getUserInfo(response => {
      props.setGlobalStore({
        isLogin: true,
        isAdmin: false,
        currentUser: {
          ...response
        }
      })
      setIsLoadedCheckLogin(true);
    }, error => {
      setIsLoadedCheckLogin(true);
    })
  }

  useEffect(() => {
    restoreLoginPreviousSection();
    // eslint-disable-next-line
  }, []);
  const ADMIN_MODE = process.env.REACT_APP_ADMIN_MODE === 'true';
  const selectedRouters = [props.router.location.pathname];
  if (!isLoadedCheckLogin) return null;
  return (
    <AppWrapper>
      <Helmet
        titleTemplate={`%s - ${WEBSITE_NAME}`}
        defaultTitle={`${WEBSITE_NAME}`}
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {
        !ADMIN_MODE && !props.isLogin && (
          <PublicLayoutWrapper
            header={(
              <FrontUserHeader
                logoName={WEBSITE_NAME}
                sider={<FrontUserSider selectedRouters={selectedRouters} redirectTo={redirectTo} />}
                redirectTo={redirectTo}
              />
            )}
            content={<PublicAppContent isLogin={props.isLogin}/>}
            footer={<FrontUserFooter />}
            router={props.router}
          />
        )
      }
      {
        !ADMIN_MODE && props.isLogin && (
          <LayoutWrapper
            header={(
              <Header logoName={WEBSITE_NAME}
                      isLogin={props.isLogin}
                      isAdmin={props.isAdmin}
                      currentUser={props.currentUser}
                      redirectTo={redirectTo}
                      signOut={signOut}
              />
            )}
            sider={<SellerSider selectedRouters={selectedRouters} redirectTo={redirectTo} setGlobalStore={props.setGlobalStore}/>}
            content={<AppContent isLogin={props.isLogin}/>}
            // footer={<Footer />}
            router={props.router}
          />
        )
      }
      {
        ADMIN_MODE && (
          <LayoutWrapper
            header={(
              <Header logoName={WEBSITE_NAME}
                      isLogin={props.isLogin}
                      isAdmin={props.isAdmin}
                      currentUser={props.currentUser}
                      redirectTo={redirectTo}
                      signOut={signOut}
              />
            )}
            sider={<AdminSider selectedRouters={selectedRouters} redirectTo={redirectTo}/> }
            content={(<AdminAppContent isLogin={props.isLogin} isAdmin={props.isAdmin} />)}
            // footer={<Footer />}
            router={props.router}
          />
        )
      }
      <BackTop style={{ right: backdropPosition, bottom: backdropPosition}}>
        <UpCircleOutlined style={{ fontSize: 30, color: 'yellow'}}/>
      </BackTop>
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isLogin, isAdmin, currentUser, products } = state.global;
  return {
    isLogin,
    isAdmin,
    currentUser,
    products,
    router: state.router,
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
