import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, PageHeader, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import RegisterForm from 'components/Share/RegisterForm';
import { UserService } from 'services';

const RegisterPage = (props) => {
  const onFinish = (values) => {
    const { confirmPassword, ...data} = values;
    UserService.register({ ...data, email: "nguyenquan5895@gmail.com"}, response => {
      notification.success({
        message: "Đăng ký thành công!",
      });
      props.goBack();
    }, error => {
      console.log(error);
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể đăng ký tài khoản bây giờ. Vui lòng thử lại sau!",
      });
    });
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <PageHeader
        onBack={() => props.goBack()}
        title="Đăng ký tài khoản"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <RegisterForm onFinish={onFinish} redirectTo={props.push} />
          </Col>
        </Row>
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
)(RegisterPage);
