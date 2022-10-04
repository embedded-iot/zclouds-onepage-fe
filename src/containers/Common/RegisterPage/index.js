import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, PageHeader, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'connected-react-router';
import RegisterForm from 'components/Share/RegisterForm';

const RegisterPage = (props) => {
  const onFinish = () => {
    props.setGlobalStore({
      isLogin: true,
      isAdmin: false,
      currentUser: {
        name: "nguyenquan5895",
      }
    })
    props.goBack();
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
