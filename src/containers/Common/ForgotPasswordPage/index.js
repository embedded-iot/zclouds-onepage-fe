import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import ForgotPasswordBox from 'components/Share/ForgotPasswordBox';
import NormalContent from 'components/Share/NormalContent';
import Logo from 'components/Share/Logo';
import logoImg from 'images/logo_icon.svg';
import logoWhite from 'images/logo_icon.svg';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';


const ForgotPasswordPage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isAdminMode = props.isAdminMode;
  return (
    <div className={`page-wrapper forgot-password__wrapper ${isAdminMode && 'forgot-password-admin__wrapper'}`}>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <div className={`page-contents forgot-password__contents ${isMobile && 'forgot-password__contents--mobile'}`}>
        <NormalContent fullScreen={true} style={{ background: !isAdminMode && isMobile && '#fff'}}>
          {
            !isAdminMode && (
              <div className="forgot-password__box">
                <div className='forgot-password__logo'>
                  <Logo src={logoImg} height={isMobile ? 38 : 64}/>
                </div>
                <ForgotPasswordBox
                  redirectTo={props.push}
                  hasBoxCard={!isMobile}
                />
              </div>
            )
          }
          {
            isAdminMode && (
              <div className="forgot-password-admin__box">
                <div className='forgot-password-admin__logo'>
                  <Logo src={logoWhite} height={54}/>
                </div>
                <ForgotPasswordBox
                  redirectTo={props.push}
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
)(ForgotPasswordPage);
