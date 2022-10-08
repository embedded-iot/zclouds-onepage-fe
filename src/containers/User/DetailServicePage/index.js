import React from 'react';
import { Helmet } from 'react-helmet';
import { Divider, PageHeader } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProtectedBox from 'components/Share/ProtectedBox';
import { ViewYoutubePost } from 'components/User/StaticPosts';
import DetailServiceBox from 'components/User/DetailServiceBox';

function DetailServicePage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{props.serviceName}</title>
      </Helmet>
      <PageHeader
        title={props.serviceName}
      />
      <div className="page-contents">
        <ProtectedBox redirectTo={props.push}
                      setGlobalStore={props.setGlobalStore}
                      isLogin={props.isLogin}
                      >
          <DetailServiceBox />
        </ProtectedBox>
        <Divider />
        <ViewYoutubePost />
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    router: state.router,
    isLogin: state.global.isLogin,
    currentUser: state.global.currentUser || {},
    products: state.global.products,
    serviceKey: ownProps.match.params.serviceKey,
    serviceName: ownProps.match.params.serviceName,
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
)(DetailServicePage);
