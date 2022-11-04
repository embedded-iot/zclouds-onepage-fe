import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import ForgotAccountForm from 'components/Share/ForgotAccountForm';
import { UserService } from 'services';
import PageHeader from 'components/Share/PageHeader';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

const ForgotAccountPage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const onFinish = (values) => {
    UserService.forgotPassword(values, response => {
      notification.success({
        message: "Vui lòng kiểm tra email, để khôi phục mật khẩu tài khoản của bạn!",
      });
      props.goBack();
    }, error => {
      notification.error({
        message: error.title || "Không thể lấy lại mật khẩu bây giờ. Vui lòng thử lại sau!",
      });
    });
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>
      <PageHeader
        isHome
        goHome={() => props.push('/')}
        title="Quên mật khẩu"
      />
      <div className="page-contents">
        <Row>
          <Col span={ isMobile ? 24 : 12 }>
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
