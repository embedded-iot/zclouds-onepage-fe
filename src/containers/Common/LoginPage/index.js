import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, PageHeader, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginForm from 'components/Share/LoginForm';
import { goBack, push } from 'connected-react-router';


const LoginPage = (props) => {
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
        <title>Đăng nhập</title>
      </Helmet>
      <PageHeader
        onBack={() => props.goBack()}
        title="Đăng nhập"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <LoginForm onFinish={onFinish} redirectTo={props.push}/>
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
)(LoginPage);
