import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Col, PageHeader, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginForm from 'components/Share/LoginForm';


const LoginPage = (props) => {
  const onFinish = () => {
    props.setGlobalStore({
      isLogin: true,
      isAdmin: false,
      currentUser: {
        name: "nguyenquan5895",
      }
    })
    if (props.router.location.query && props.router.location.redirect)
      props.history.push(props.router.location.redirect);
    else
      props.history.push('/');
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Đăng nhập e</title>
      </Helmet>
      <PageHeader
        onBack={() => props.history.goBack()}
        title="Đăng nhập"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <LoginForm onFinish={onFinish} />
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(LoginPage);
