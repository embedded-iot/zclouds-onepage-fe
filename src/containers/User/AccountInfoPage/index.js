import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, PageHeader, Row } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack } from 'connected-react-router';
import UserDetailBox from 'components/Share/UserDetailBox';
import UserDetailForm from 'components/Share/UserDetailForm';

const AccountInfoPage = (props) => {
  const onFinish = () => {

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
