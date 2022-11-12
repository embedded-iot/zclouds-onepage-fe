import React from 'react';
import { notification } from 'antd';
import { ShopBaseForm, ShopifyForm, WooCommerceForm } from './Vendors';
import { SellerIntegrationsService } from 'services';
import ConnectStoreBox from './ConnectStoreBox';
import { STORE_TYPE_VALUES } from 'components/contants';

const CONNECT_FORMS = {
  [STORE_TYPE_VALUES.SHOPIFY]: ShopifyForm,
  [STORE_TYPE_VALUES.SHOP_BASE]: ShopBaseForm,
  [STORE_TYPE_VALUES.WOO_COMMERCE]: WooCommerceForm,
}

export default function IntegrationsStore({ type, onFinish }) {
  const handleConnect = (values) => {
    SellerIntegrationsService.connectStore(type, values, response => {
      notification.success({
        message: "Connect store successful!",
      });
      onFinish();
    }, error => {
      notification.error({
        message: error && error.title ? error.title : "Connect store failure!",
      });
    })
  }

  const ConnectForm = CONNECT_FORMS[type];

  return (
    <ConnectStoreBox
        description={"You need to setting on your Shopify first. Watch video instructions to sync orders with Shopify."}
       videoSrc={'https://www.youtube.com/watch?v=XO-n9U-UwSk&feature=emb_title'}
    >
      <ConnectForm onFinish={handleConnect}/>
    </ConnectStoreBox>
  )
}
