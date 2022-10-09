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
  const { id:userId, fullName, userName, phone, email, address, avatar } = props.currentUser;
  const initialValues = {
    fullName,
    userName,
    phone,
    email,
    address,
    avatar,
  }

  const onFinish = (values) => {
    const { fullName, email, phone, address, avatar, oldPassword, newPassword } = values;
    const changeUserInfoPromise = new Promise((resolve, reject) => {
      UserService.changeUserInfo(userId, { fullName, email, phone, address, avatar }, resolve, reject)
    });
    const changePasswordPromise = !!oldPassword && !!newPassword ? new Promise((resolve, reject) => {
      UserService.changePassword(userId, { oldPassword, newPassword }, resolve, reject)
      }) : true;
    Promise.all([changeUserInfoPromise, changePasswordPromise])
      .then( ([changeUserInfoResponse, changePasswordResponse]) => {
        props.setGlobalStore({
          currentUser: {
            ...props.currentUser,
            ...changeUserInfoResponse.data
          }
        })
        notification.success({
          message: "Thay đổi thông tin tài khoản thành công!",
        });
      })
      .catch(error => {
        notification.error({
          message: error.status && error.status.message ? error.status.message : "Thay đổi thông tin tài khoản thất bại. Vui lòng thử lại sau!",
        });
    })
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
