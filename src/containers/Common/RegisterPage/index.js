import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import RegisterForm from 'components/Share/RegisterForm';
import { BaseService, UserService } from 'services';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import NormalContent from 'components/Share/NormalContent';
import logoImg from 'images/logo_icon.svg';
import Logo from 'components/Share/Logo';
import { useMediaQuery } from 'react-responsive';

import './style.scss'

const RegisterPage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const onFinish = (values) => {
    const { confirmPassword, ...data} = values;
    UserService.register(data, response => {
      notification.success({
        message: "Register successful! Please check the email and active your account!",
      });
      props.push(ROUTERS.ROOT);
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Register failure!"),
      });
    });
  }

  return (
    <div className="page-wrapper--full-width sign-up__wrapper">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <Row className="page-contents sign-up__contents">
        <Col span={isMobile ? 24 : 24} >
          <NormalContent style={{ background: isMobile && '#fff'}}>
            <div className="sign-up__box">
              <div className='sign-up__logo'>
                <Logo src={logoImg} height={isMobile ? 38 : 64}/>
              </div>
              <RegisterForm onFinish={onFinish}
                            redirectTo={props.push}
                            hasBoxCard={!isMobile}
              />
            </div>
          </NormalContent>
        </Col>
      </Row>
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
)(RegisterPage);
