import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import DesignsTable from 'components/Seller/DesignsTable';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

function DesignsPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [totalCount, setTotalCount] = useState(0);
  const breadcrumbRouters = [
    {
      path: ROUTERS.ROOT,
      breadcrumbName: 'Dashboard',
    },
    {
      breadcrumbName: 'Design library',
    },
    {
      breadcrumbName: 'Design sku',
    },
  ];
  const successCallback = (response) => {
    setTotalCount(response.totalCount || 0);
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Design Sku</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Design Sku"
        description={`We found ${totalCount} results.`}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <DesignsTable successCallback={successCallback} />
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
)(DesignsPage);
