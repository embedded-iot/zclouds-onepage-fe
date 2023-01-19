import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import LoginBox from 'components/Share/LoginBox';
import NormalContent from 'components/Share/NormalContent';
import Logo from 'components/Share/Logo';
import logoGray from 'images/logo_gray.svg';
import logoImg from 'images/logo.svg';
import logoWhite from 'images/logo-white.svg';
import { ROUTERS } from 'components/contants';

import './style.scss';
const LoginPage = (props) => {
  const queryParams = new URLSearchParams(props.location.search);
  const onFinish = () => {
    const redirect = queryParams.get("redirect")
    if (!!redirect) {
      props.push(redirect);
    } else {
      props.push(ROUTERS.ROOT);
    }
  }
  const isAdminMode = props.isAdminMode;
  return (
    <div className={`page-wrapper sign-in__wrapper ${isAdminMode && 'sign-in-admin__wrapper'}`}>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className="page-contents sign-in__contents">
        <NormalContent fullScreen={true}>
          {
            !isAdminMode && (
              <div>
                <div className='sign-in__image sign-in__image--top-logo'>
                  <Logo src={logoImg} height={64}/>
                </div>
                <LoginBox onFinish={onFinish}
                          redirectTo={props.push}
                          setGlobalStore={props.setGlobalStore}
                />

                <div className='sign-in__image sign-in__image--left' />
                <div className='sign-in__image sign-in__image--bottom-logo'>
                  <Logo src={logoGray} height={32} />
                </div>
                <div className='sign-in__image sign-in__image--right' />
              </div>
            )
          }
          {
            isAdminMode && (
              <div className="sign-in-admin__login-form">
                <div className='sign-in-admin__logo'>
                  <Logo src={logoWhite} height={54}/>
                </div>
                <LoginBox onFinish={onFinish}
                          redirectTo={props.push}
                          setGlobalStore={props.setGlobalStore}
                          isAdminMode={true}
                />
              </div>
            )
          }
        </NormalContent>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    router: state.router,
    isAdminMode: state.global.isAdminMode,
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
)(LoginPage);
