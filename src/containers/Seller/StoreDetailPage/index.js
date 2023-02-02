import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import EditStoreBox from 'components/Seller/EditStoreBox';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';

import './style.scss';
import { useMediaQuery } from 'react-responsive';

function StoreDetailPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const { storeId } = props.match ? props.match.params : {};
  const breadcrumbRouters = [
    {
      path: ROUTERS.ROOT,
      breadcrumbName: 'Dashboard',
    },
    {
      path: ROUTERS.SELLER_STORES,
      breadcrumbName: 'Integrations',
    },
    {
      breadcrumbName: 'Store',
    },
  ]
  return (
    <div className="page-wrapper store-detail__wrapper">
      <Helmet>
        <title>Edit Store</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Edit Store"
        description={`Store ID: ${storeId}`}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <div className={`store-detail__description ${isMobile && 'box-card--mobile'}`}>
          Update and edit your store information. Contact Fulfill IT department if there is a problem with the API connection to your store.Email: Fulfill@gmail.com
        </div>
        <EditStoreBox id={storeId}
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
)(StoreDetailPage);
