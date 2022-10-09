import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Row } from 'antd';
import UserDetailBox from 'components/Share/UserDetailBox';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BannerBox from 'components/User/BannerBox';
import { WEBSITE_DOMAIN } from 'components/contants';
import ProductList from 'components/User/ProductList';

function HomePage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div className="page-contents">
        <Row gutter={[20, 20]}>
          {
            props.isLogin && (
              <Col>
                <UserDetailBox userInfo={props.currentUser} />
              </Col>
            )
          }
          <Col>
            <BannerBox />
          </Col>
          <Col>
            <p>SỬ DỤNG CÁC DỊCH VỤ NHIỀU NGƯỜI DÙNG NHẤT TẠI {WEBSITE_DOMAIN.toUpperCase()}</p>
            <br/>
            <ProductList products={props.products} redirectTo={props.push}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    isLogin: state.global.isLogin,
    currentUser: state.global.currentUser || {},
    products: state.global.products,
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
)(HomePage);
