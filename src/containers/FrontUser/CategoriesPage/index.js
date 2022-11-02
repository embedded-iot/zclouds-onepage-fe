import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Row } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import PageHeaderBar from 'components/Common/PageHeaderBar';
import { useMediaQuery } from 'react-responsive';

function CategoriesPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <PageHeaderBar
        isHome
        goHome={() => props.push('/')}
        title="Sản phẩm"
      />
      <div className="page-contents">

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    isLogin: state.global.isLogin,
    currentUser: state.global.currentUser || {},
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
)(CategoriesPage);
