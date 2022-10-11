import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, notification, Row } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import UserDetailBox from 'components/Share/UserDetailBox';
import UserDetailForm from 'components/Share/UserDetailForm';
import { UserService } from 'services';
import { setGlobalStore } from 'containers/App/actions';
import PageHeaderBar from 'components/Common/PageHeaderBar';

const AccountInfoPage = (props) => {
  // eslint-disable-next-line
  const { id, name, loginId, phoneNumber, email, address, avatar } = props.currentUser;
  const initialValues = {
    name,
    loginId,
    phoneNumber,
    email,
    address,
    avatar,
  }

  const onFinish = (values) => {
    // eslint-disable-next-line
    const { name, email, phoneNumber, address, avatar, oldPassword, newPassword } = values;
    UserService.changeUserInfo( {
      name,
      phoneNumber,
      password: newPassword,
      currentPassword: oldPassword,
    }, response => {
      props.setGlobalStore({
        currentUser: {
          ...props.currentUser,
          name,
          phoneNumber,
        }
      })
      notification.success({
        message: "Thay đổi thông tin tài khoản thành công!",
      });
    }, error => {
      notification.error({
        message: error.title || "Thay đổi thông tin tài khoản thất bại. Vui lòng thử lại sau!",
      });
    });
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <PageHeaderBar
        isHome
        goHome={() => props.push('/')}
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
            <UserDetailForm initialValues={initialValues} onFinish={onFinish} />
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
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(AccountInfoPage);
