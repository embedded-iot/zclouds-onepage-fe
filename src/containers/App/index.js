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
import { Switch, Route, withRouter, Redirect, matchPath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';
import { authentication } from 'utils';

import Header from 'components/Share/Header';
import NormalHeader from 'components/Share/NormalHeader';

import LayoutWrapper from 'components/Share/Layout/LayoutWapper';
import PublicLayoutWrapper from 'components/Share/Layout/PublicLayoutWapper';
import NormalLayoutWrapper from 'components/Share/Layout/NormalLayoutWrapper';

import FrontUserHeader from 'components/FrontUser/Header';
import FrontUserFooter from 'components/FrontUser/Footer';
import FrontUserSider from 'components/FrontUser/Sider';

import SellerSider from 'components/Seller/Sider';
import AdminSider from 'components/Admin/Sider';


import LoginPage from 'containers/Common/LoginPage/Loadable';
import RegisterPage from 'containers/Common/RegisterPage/Loadable';

import FrontUserHomePage from 'containers/FrontUser/HomePage/Loadable';
import FrontUserAllProductsPage from 'containers/FrontUser/CategoriesPage/Loadable';
import FrontUserProductDetailPage from 'containers/FrontUser/ProductDetailPage/Loadable';
import FrontUserSKUPage from 'containers/FrontUser/SKUPage/Loadable';

import SellerHomePage from 'containers/Seller/HomePage/Loadable';


import AdminHomePage from 'containers/Admin/HomePage/Loadable';
import AdminProductManagementPage from 'containers/Admin/ProductManagementPage';
import CategoriesManagementPage from 'containers/Admin/CategoriesManagementPage';


import { ADMIN_ROLES, RESPONSIVE_MEDIAS, ROUTERS, WEBSITE_NAME } from 'components/contants';

import { UserService } from 'services';


import './style.scss';

const FRONT_USER_ROUTER = [
  ROUTERS.ROOT,
  ROUTERS.FRONT_USER_ALL_PRODUCTS,
  ROUTERS.FRONT_USER_ALL_PRODUCTS_WITH_CATEGORY,
  ROUTERS.FRONT_USER_PRODUCT_DETAIL,
  ROUTERS.FRONT_USER_SKU,
  ROUTERS.FRONT_USER_REGISTER,
];


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
    <Route exact path={ROUTERS.LOGIN} component={LoginPage} />
  </Switch>
);

const FrontUserAppContent = (props) => (
  <Switch>
    <Route exact path={ROUTERS.FRONT_USER_REGISTER} component={RegisterPage} />
    <Route exact path={ROUTERS.ROOT} component={FrontUserHomePage} />
    <Route exact path={ROUTERS.FRONT_USER_ALL_PRODUCTS} component={FrontUserAllProductsPage} />
    <Route exact path={ROUTERS.FRONT_USER_ALL_PRODUCTS_WITH_CATEGORY} component={FrontUserAllProductsPage} />
    <Route exact path={ROUTERS.FRONT_USER_PRODUCT_DETAIL} component={FrontUserProductDetailPage} />
    <Route exact path={ROUTERS.FRONT_USER_SKU} component={FrontUserSKUPage} />
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
    <PrivateRoute exact path={ROUTERS.ADMIN_PRODUCTS_MANAGEMENT} component={AdminProductManagementPage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_CATEGORIES_MANAGEMENT} component={CategoriesManagementPage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_ADMINS_MANAGEMENT} component={AdminHomePage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_ROLES_MANAGEMENT} component={AdminHomePage} isAuthenticated={props.isLogin && props.isAdmin}/>
  </Switch>
)

const HelmetMeta = (props) => (
  <Helmet
    titleTemplate={`%s - ${WEBSITE_NAME}`}
    defaultTitle={`${WEBSITE_NAME}`}
  >
    <meta name="description" content="A React.js Boilerplate application" />
  </Helmet>
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
      isAdminMode: false,
      isLogin: false,
      isAdmin: false,
      currentUser: {},
    })
    props.push(ROUTERS.ROOT);
  }

  const restoreLoginPreviousSection = () => {
    UserService.getUserInfo(response => {
      props.setGlobalStore({
        isAdminMode: ADMIN_ROLES.includes(response.role),
        isLogin: true,
        isAdmin: ADMIN_ROLES.includes(response.role),
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
  const isAdminMode = process.env.REACT_APP_ADMIN_MODE === 'true' || props.isAdminMode;
  const currentRouter = props.router.location.pathname;
  const isFrontUserRouter = FRONT_USER_ROUTER.find(path => {
    return (path === currentRouter) || matchPath(currentRouter, {
      path,
      exact: true,
      strict: false
    });
  });
  const selectedRouters = [props.router.location.pathname];
  if (!isLoadedCheckLogin) return null;
  if (currentRouter.startsWith(ROUTERS.LOGIN)) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <NormalLayoutWrapper
          header={<NormalHeader />}
          content={<PublicAppContent />}
        />
      </AppWrapper>
    )
  } else if (isAdminMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
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
      </AppWrapper>
    )
  }
  return (
    <AppWrapper>
      <HelmetMeta />
      {
        isFrontUserRouter && !props.isLogin && (
          <PublicLayoutWrapper
            header={(
              <FrontUserHeader
                logoName={WEBSITE_NAME}
                sider={<FrontUserSider selectedRouters={selectedRouters} redirectTo={redirectTo} />}
                redirectTo={redirectTo}
              />
            )}
            content={<FrontUserAppContent isLogin={props.isLogin}/>}
            footer={<FrontUserFooter />}
            router={props.router}
          />
        )
      }
      {
        props.isLogin && (
          <LayoutWrapper
            header={(
              <Header logoName={WEBSITE_NAME}
                      isLogin={props.isLogin}
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
      <BackTop style={{ right: backdropPosition, bottom: backdropPosition}}>
        <UpCircleOutlined style={{ fontSize: 30, color: 'yellow'}}/>
      </BackTop>
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isAdminMode, isLogin, isAdmin, currentUser, products } = state.global;
  return {
    isAdminMode,
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
