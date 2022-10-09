import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import ForgotAccountForm from 'components/Share/ForgotAccountForm';
import { UserService } from 'services';
import PageHeaderBar from 'components/Common/PageHeaderBar';

const ForgotAccountPage = (props) => {
  const onFinish = (values) => {
    UserService.forgotPassword(values, response => {
      notification.success({
        message: "Vui lòng kiểm tra email, để khôi phục mật khẩu tài khoản của bạn!",
      });
      props.goBack();
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể lấy lại mật khẩu bây giờ. Vui lòng thử lại sau!",
      });
    });
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>
      <PageHeaderBar
        isHome
        goHome={() => props.push('/')}
        title="Quên mật khẩu"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <ForgotAccountForm onFinish={onFinish} />
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
)(ForgotAccountPage);
