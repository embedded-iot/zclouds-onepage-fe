import React from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ViewYoutubePost } from 'components/User/StaticPosts';
import PageHeaderBar from 'components/Common/PageHeaderBar';

function DetailPostPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{props.postName}</title>
      </Helmet>
      <PageHeaderBar
        title={props.postName}
      />
      <div className="page-contents">
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
    postKey: ownProps.match.params.postKey,
    postName: ownProps.match.params.postName,
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
)(DetailPostPage);
