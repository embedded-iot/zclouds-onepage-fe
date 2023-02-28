import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import ChangePasswordBox from 'components/Share/ChangePasswordBox';
import NormalContent from 'components/Share/NormalContent';
import Logo from 'components/Share/Logo';
import logoGray from 'images/logo_gray.svg';
import logoImg from 'images/logo.svg';
import logoWhite from 'images/logo-white.svg';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';


const ChangePasswordPage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isAdminMode = props.isAdminMode;
  const queryParams = new URLSearchParams(props.location.search);
  const email = queryParams.get("email");
  const code = queryParams.get("code");
  return (
    <div className={`page-wrapper change-password__wrapper ${isAdminMode && 'change-password-admin__wrapper'}`}>
      <Helmet>
        <title>Change password</title>
      </Helmet>
      <div className={`page-contents change-password__contents ${isMobile && 'change-password__contents--mobile'}`}>
        <NormalContent fullScreen={true} style={{ background: !isAdminMode && isMobile && '#fff'}}>
          {
            !isAdminMode && (
              <div className="change-password__box">
                <div className='change-password__logo'>
                  <Logo src={logoImg} height={isMobile ? 38 : 64}/>
                </div>
                <ChangePasswordBox
                  defaultParams={{ email, code }}
                  redirectTo={props.push}
                  hasBoxCard={!isMobile}
                />
                {
                  !isMobile && !isTablet && (
                    <>
                      <div className='change-password__image change-password__image--left' />
                      <div className='change-password__image change-password__image--bottom-logo'>
                        <Logo src={logoGray} height={32} />
                      </div>
                      <div className='change-password__image change-password__image--right' />
                    </>
                  )
                }
              </div>
            )
          }
          {
            isAdminMode && (
              <div className="change-password-admin__box">
                <div className='change-password-admin__logo'>
                  <Logo src={logoWhite} height={54}/>
                </div>
                <ChangePasswordBox
                  defaultParams={{ username, code }}
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
)(ChangePasswordPage);
