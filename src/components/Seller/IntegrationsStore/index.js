import React from 'react';
import { notification } from 'antd';
import ShopifyForm from './Vendors/ShopifyForm';
import { SellerStoresService } from 'services';
import ConnectStoreBox from './ConnectStoreBox';

export default function IntegrationsStore({ type, onFinish }) {
  const handleConnect = (values) => {
    SellerStoresService.createStore({ type, ...values }, response => {
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
  return (
    <ConnectStoreBox
        description={"You need to setting on your Shopify first. Watch video instructions to sync orders with Shopify."}
       videoSrc={'https://www.youtube.com/watch?v=XO-n9U-UwSk&feature=emb_title'}
    >
      <ShopifyForm onFinish={handleConnect}/>
    </ConnectStoreBox>
  )
}
