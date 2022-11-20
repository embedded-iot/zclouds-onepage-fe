import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import RegisterForm from 'components/Share/RegisterForm';
import { BaseService, UserService } from 'services';
import { ROUTERS } from 'components/contants';
import NormalContent from 'components/Share/NormalContent';
import bannerImg from 'images/banner-img.png';
import logoImg from 'images/logo.svg';
import Logo from 'components/Share/Logo';

import './style.scss'

const RegisterPage = (props) => {
  const onFinish = (values) => {
    const { confirmPassword, ...data} = values;
    UserService.register(data, response => {
      notification.success({
        message: "Register successful!",
      });
      props.push(ROUTERS.LOGIN);
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
        <Col span={14} >
          <NormalContent>
            <div>
              <div className='sign-up__logo'>
                <Logo src={logoImg} height={64}/>
              </div>
              <RegisterForm onFinish={onFinish} redirectTo={props.push} />
            </div>
          </NormalContent>
        </Col>
        <Col span={10} className="sign-up__img">
          <img src={bannerImg} alt='sign-up' />
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
