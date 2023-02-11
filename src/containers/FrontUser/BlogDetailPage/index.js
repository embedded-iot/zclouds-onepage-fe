import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import BlogDetailBox from 'components/FrontUser/BlogDetailBox';
import { useMediaQuery } from 'react-responsive';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';


function BlogDetailPage(props) {
  const { blogCategoryName, blogCategoryId, blogName, blogId } = props.match ? props.match.params : {};
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const breadcrumbRoutes = [
    {
      path: ROUTERS.FRONT_USER_BLOGS,
      breadcrumbName: 'All blogs',
    },
    {
      breadcrumbName: decodeURIComponent(blogCategoryName),
    },
    {
      breadcrumbName: decodeURIComponent(blogName),
    },
  ];
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} blog-detail-page__wrapper`}>
      <Helmet>
        <title>Blog details</title>
      </Helmet>
      <div className="page-contents">
        <BreadcrumbBox className={isMobile && 'box-card--mobile'}
                       routes={breadcrumbRoutes}
        />
        <BlogDetailBox
          blogId={blogId}
          blogCategoryId={blogCategoryId}
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
