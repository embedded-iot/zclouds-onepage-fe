import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, PageHeader, Row } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack } from 'connected-react-router';
import UserDetailBox from 'components/Share/UserDetailBox';
import UserDetailForm from 'components/Share/UserDetailForm';
import { UserService } from 'services';
import { setGlobalStore } from 'containers/App/actions';

const AccountInfoPage = (props) => {
  const changeUserInfo = (userId, data) => {
    UserService.changeUserInfo(userId, data, response => {
      notification.success({
        message: "Thay đổi thông tin tài khoản thành công!",
      });
      props.setGlobalStore({
        currentUser: {
          ...props.currentUser,
          ...response.data
        }
      })
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể thay đổi thông tin bây giờ. Vui lòng thử lại sau!",
      });
    });
  }
  const changePassword = (userId, data) => {
    UserService.changePassword(userId, data, response => {
      notification.success({
        message: "Thay đổi mật khẩu thành công!",
      });
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể mật khẩu bây giờ. Vui lòng thử lại sau!",
      });
    });
  }
  const onFinish = (values) => {
    const { fullName, email, phone, address, avatar, oldPassword, newPassword } = values;
    changeUserInfo(props.currentUser.userId, { fullName, email, phone, address, avatar })
    if (!!oldPassword && !!newPassword) {
      changePassword(props.currentUser.userId, { oldPassword, newPassword })
    }
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <PageHeader
        onBack={() => props.goBack()}
        title="Thông tin tài khoản"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <UserDetailBox userInfo={props.currentUser} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <UserDetailForm onFinish={onFinish} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { currentUser } = state.global;
  return {
    currentUser: currentUser || {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
    goBack: () => dispatch(goBack()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(AccountInfoPage);
