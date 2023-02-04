import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BlogDetailBox from 'components/FrontUser/BlogDetailBox';
import { useMediaQuery } from 'react-responsive';


function BlogDetailPage(props) {
  const { blogId } = props.match ? props.match.params : {};
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} blog-detail-page__wrapper`}>
      <Helmet>
        <title>Blog details</title>
      </Helmet>
      <div className="page-contents">
        <BlogDetailBox
          blogId={blogId}
          redirectTo={props.push}
        />
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
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(BlogDetailPage);
