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

import './style.scss';
const LoginPage = (props) => {
  const queryParams = new URLSearchParams(props.location.search);
  const onFinish = () => {
    const redirect = queryParams.get("redirect")
    if (!!redirect) {
      props.push(redirect);
    } else {
      props.goBack();
    }
  }

  return (
    <div className="page-wrapper sign-in__wrapper">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className="page-contents sign-in__contents">
        <NormalContent>
          <div>
            <LoginBox onFinish={onFinish}
                      redirectTo={props.push}
                      setGlobalStore={props.setGlobalStore}
            />
          </div>
        </NormalContent>
        <div className='sign-in__image sign-in__image--left' />
        <div className='sign-in__image sign-in__image--logo'>
          <Logo src={logoGray} height={32} />
        </div>
        <div className='sign-in__image sign-in__image--right' />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    router: state.router,
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
