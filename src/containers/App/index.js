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
import { goBack, push } from 'connected-react-router';
// import { BackTop } from 'antd';
// import { UpCircleOutlined } from '@ant-design/icons';
// import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';
import { authentication, datetime } from 'utils';

import Header from 'components/Share/Header';

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
import ForgotPasswordPage from 'containers/Common/ForgotPasswordPage/Loadable';
import ChangePasswordPage from 'containers/Common/ChangePasswordPage/Loadable';

import FrontUserHomePage from 'containers/FrontUser/HomePage/Loadable';

import SellerHomePage from 'containers/Seller/HomePage/Loadable';
import SellerSettingsPage from 'containers/Seller/SettingsPage/Loadable';
import SellerSettingDetailPage from 'containers/Seller/SettingDetailPage/Loadable';
import SellerProductsPage from 'containers/Seller/ProductsPage/Loadable';


import AdminHomePage from 'containers/Admin/HomePage/Loadable';
import AdminProductManagementPage from 'containers/Admin/ProductManagementPage/Loadable';
import AdminProductDetailManagementPage from 'containers/Admin/ProductDetailManagementPage/Loadable';
import AdminUsersManagementPage from 'containers/Admin/UsersManagementPage/Loadable';
import AdminUserDetailManagementPage from 'containers/Admin/UserDetailManagementPage/Loadable';
import AdminOrdersManagementPage from 'containers/Admin/OrdersManagementPage/Loadable';
import AdminOrderDetailManagementPage from 'containers/Admin/OrderDetailManagementPage/Loadable';
import AdminStoresManagementPage from 'containers/Admin/StoresManagementPage/Loadable';
import AdminSellersManagementPage from 'containers/Admin/SellersManagementPage/Loadable';
import AdminSystemManagementPage from 'containers/Admin/SystemManagementPage/Loadable';
import AdminStatisticsManagementPage from 'containers/Admin/StatisticsManagementPage/Loadable';


import {
  ADMIN_ROLES,
  DATETIME_FORMAT,
  PERMISSION_VALUES, RESPONSIVE_MEDIAS,
  ROLE_PERMISSIONS_VALUES,
  ROUTERS,
  WEBSITE_NAME,
} from 'components/contants';

import {  SellerSystemService, UserService } from 'services';

import './style.scss';
import { useMediaQuery } from 'react-responsive';

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
    <Route exact path={ROUTERS.REGISTER} component={RegisterPage} />
    <Route exact path={ROUTERS.FORGOT_PASSWORD} component={ForgotPasswordPage} />
    <Route exact path={ROUTERS.CHANGE_PASSWORD} component={ChangePasswordPage} />
  </Switch>
);

const FrontUserAppContent = (props) => (
  <>
    <Switch>
      <Route exact path={ROUTERS.ROOT} component={FrontUserHomePage} />
    </Switch>
  </>

)

const AppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.ROOT} component={SellerHomePage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.ROOT} component={SellerHomePage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.SELLER_SETTINGS} component={SellerSettingsPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_SETTINGS)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_DETAIL_SETTING} component={SellerSettingDetailPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_SETTINGS)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_SUB_DETAIL_SETTING} component={SellerSettingDetailPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_SETTINGS)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_PRODUCTS} component={SellerProductsPage} isAuthenticated={props.isLogin}/>
  </Switch>
)

const AdminAppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.ROOT} component={AdminHomePage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_PRODUCTS_MANAGEMENT} component={AdminProductManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_PRODUCT} component={AdminProductDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_USERS_MANAGEMENT} component={AdminUsersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_USER} component={AdminUserDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_USER)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_USER_WITH_ROLE} component={AdminUserDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_USER)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_ORDERS_MANAGEMENT} component={AdminOrdersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_ORDER_MANAGEMENT} component={AdminOrderDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_ORDER)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_STORES_MANAGEMENT} component={AdminStoresManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STORES)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SELLERS_MANAGEMENT} component={AdminSellersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT} component={AdminSystemManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_STATISTICS_MANAGEMENT} component={AdminStatisticsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STATISTICS)}/>
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
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [isLoadedCheckLogin, setIsLoadedCheckLogin] = useState(false);
  const isAdminMode = props.isAdminMode;
  const isSellerMode = props.isSellerMode;
  // const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  // const backdropPosition = isMobile ? 40 : 23;
  const redirectTo = path => {
    props.push(path);
  }
  const goBack = () => {
    props.goBack();
  }
  const signOut = () => {
    authentication.clearToken();
    props.setGlobalStore({
      isAdminMode: isAdminMode,
      isLogin: false,
      isAdmin: false,
      currentUser: {},
    })
    props.push(ROUTERS.ROOT);
  }

  const restoreLoginPreviousSection = () => {
    UserService.getUserInfo(response => {
      authentication.setPermissions(ROLE_PERMISSIONS_VALUES[response.role]);
      props.setGlobalStore({
        isAdminMode: ADMIN_ROLES.includes(response.role),
        isLogin: true,
        isAdmin: ADMIN_ROLES.includes(response.role),
        currentUser: {
          ...response,
          convertedLastLogin: datetime.convert(new Date(), DATETIME_FORMAT),
        }
      })
      setIsLoadedCheckLogin(true);
    }, error => {
      setIsLoadedCheckLogin(true);
    })
  }


  const getSystemConfigs = () => {
    SellerSystemService.getSystemConfigs({}, response => {
      props.setGlobalStore({
        systemConfigs: SellerSystemService.getActivatedSystemConfigs(response.items),
      });
    }, () => {})
  }

  useEffect(() => {
    getSystemConfigs();
    // eslint-disable-next-line
  }, [props.isLogin]);

  useEffect(() => {
    restoreLoginPreviousSection();
    // eslint-disable-next-line
  }, []);
  const currentRouter = props.router.location.pathname;
  const selectedRouters = [currentRouter];
  if (!isLoadedCheckLogin) return null;
  if (currentRouter.startsWith(ROUTERS.LOGIN) || currentRouter.startsWith(ROUTERS.REGISTER) || currentRouter.startsWith(ROUTERS.FORGOT_PASSWORD) || currentRouter.startsWith(ROUTERS.CHANGE_PASSWORD)) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <NormalLayoutWrapper
          // header={<NormalHeader />}
          content={<PublicAppContent />}
        />
      </AppWrapper>
    )
  } else if (isAdminMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <LayoutWrapper
          className={`layout__admin-mode ${isMobile && 'layout__admin-mode--mobile'}`}
          header={(
            <Header logoName={WEBSITE_NAME}
                    isLogin={props.isLogin}
                    isAdmin={props.isAdmin}
                    currentUser={props.currentUser}
                    selectedRouters={selectedRouters}
                    redirectTo={redirectTo}
                    goBack={goBack}
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
  if (isSellerMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <LayoutWrapper
          header={(
            <Header logoName={WEBSITE_NAME}
                    isLogin={props.isLogin}
                    currentUser={props.currentUser}
                    redirectTo={redirectTo}
                    selectedRouters={selectedRouters}
                    goBack={goBack}
                    signOut={signOut}
            />
          )}
          sider={<SellerSider selectedRouters={selectedRouters} redirectTo={redirectTo} setGlobalStore={props.setGlobalStore} systemConfigs={props.systemConfigs}/>}
          content={<AppContent isLogin={props.isLogin}/>}
          // footer={<SellerFooter systemConfigs={props.systemConfigs} />}
          router={props.router}
        />
      </AppWrapper>
    )
  }
  return (
    <AppWrapper>
      <HelmetMeta />
      <PublicLayoutWrapper
        header={(
          <FrontUserHeader
            logoName={WEBSITE_NAME}
            sider={<FrontUserSider selectedRouters={selectedRouters} redirectTo={redirectTo} />}
            redirectTo={redirectTo}
          />
        )}
        content={<FrontUserAppContent />}
        footer={<FrontUserFooter systemConfigs={props.systemConfigs} redirectTo={redirectTo}  />}
        router={props.router}
      />
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isSellerMode, isAdminMode, isLogin, isAdmin, currentUser, products, systemConfigs } = state.global;
  return {
    isSellerMode,
    isAdminMode,
    isLogin,
    isAdmin,
    currentUser,
    products,
    systemConfigs,
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
    push: path => dispatch(push(path)),
    goBack: path => dispatch(goBack()),
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
