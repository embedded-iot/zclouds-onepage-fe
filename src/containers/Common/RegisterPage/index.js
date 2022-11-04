import React from 'react';
import { Helmet } from 'react-helmet';
import { notification } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import RegisterForm from 'components/Share/RegisterForm';
import { UserService } from 'services';
import { ROUTERS } from 'components/contants';
import NormalContent from 'components/Share/NormalContent';

const RegisterPage = (props) => {
  const onFinish = (values) => {
    const { confirmPassword, ...data} = values;
    UserService.register(data, response => {
      notification.success({
        message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản của bạn.",
      });
      props.push(ROUTERS.LOGIN);
    }, error => {
      notification.error({
        message: error.title || "Không thể đăng ký tài khoản bây giờ. Vui lòng thử lại sau!",
      });
    });
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <div className="page-contents">
        <NormalContent>
          <RegisterForm onFinish={onFinish} redirectTo={props.push} />
        </NormalContent>
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
