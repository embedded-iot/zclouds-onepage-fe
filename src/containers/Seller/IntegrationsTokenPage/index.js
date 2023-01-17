import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { notification } from 'antd';
import { ROUTERS, STORE_TYPE_LABELS, STORE_TYPE_VALUES } from 'components/contants';
import queryString from 'query-string';
import { BaseService, SellerIntegrationsService } from 'services';


function IntegrationsTokenPage(props) {
  const queryData= queryString.parse(props.location.search);
  const { vendorId: type } = props.match ? props.match.params : {};
  const storeTypeLabel = STORE_TYPE_LABELS[type];

  useEffect(() => {
    if (type === STORE_TYPE_VALUES.SHOPIFY && Object.keys(queryData).length) {
      SellerIntegrationsService.connectShopifyStoreWithData(type, queryData, response => {
        notification.success({
          message: "Connect store successful!",
        });
        const integrationTokenRedirect  = localStorage.getItem('INTEGRATION_TOKEN_REDIRECT');
        const defaultRedirect = ROUTERS.SELLER_INTEGRATIONS + '/' + STORE_TYPE_VALUES.SHOPIFY;
        localStorage.removeItem('INTEGRATION_TOKEN_REDIRECT');
        props.push(!!integrationTokenRedirect ? integrationTokenRedirect : defaultRedirect );
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Connect store failure!"),
        });
      })
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Get token {storeTypeLabel}</title>
      </Helmet>
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
)(IntegrationsTokenPage);
