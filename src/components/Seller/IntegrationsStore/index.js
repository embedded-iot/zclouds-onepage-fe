import React from 'react';
import { notification } from 'antd';
import { ShopBaseForm, ShopifyForm, WooCommerceForm } from './Vendors';
import { BaseService, SellerIntegrationsService } from 'services';
import ConnectStoreBox from './ConnectStoreBox';
import { STORE_TYPE_VALUES } from 'components/contants';

const CONNECT_FORMS = {
  [STORE_TYPE_VALUES.SHOPIFY]: ShopifyForm,
  [STORE_TYPE_VALUES.SHOP_BASE]: ShopBaseForm,
  [STORE_TYPE_VALUES.WOO_COMMERCE]: WooCommerceForm,
}

export default function IntegrationsStore({ type, storeTypeLabel, onFinish }) {
  const getDomain = (type, domain) => {
    switch (type) {
      case STORE_TYPE_VALUES.SHOP_BASE:
        return `https://${domain}.onshopbase.com`;
      case STORE_TYPE_VALUES.SHOPIFY:
        return `https://${domain}.myshopify.com`;
      default:
        return domain;
    }
  }
  const handleConnect = (values) => {
    const { domain, ...rest } = values;
    const data = {
      ...rest,
      domain: getDomain(type, domain),
    }
    SellerIntegrationsService.connectStore(type, data, response => {
      notification.success({
        message: "Connect store successful!",
      });
      onFinish();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }

  const ConnectForm = CONNECT_FORMS[type];

  return (
    <ConnectStoreBox
        description={`You need to setting on your ${storeTypeLabel} first. Watch video instructions to sync orders with ${storeTypeLabel}.`}
       videoSrc={'https://www.youtube.com/watch?v=XO-n9U-UwSk&feature=emb_title'}
    >
      <ConnectForm onFinish={handleConnect}/>
    </ConnectStoreBox>
  )
}
