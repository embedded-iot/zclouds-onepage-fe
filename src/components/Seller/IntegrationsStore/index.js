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

export default function IntegrationsStore({ type, storeTypeLabel, onFinish, redirectTo }) {
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

  const connectShopBase = (values) => {
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

  const connectShopify = (values) => {
    const { domain } = values;
    const data = {
      shopUrl: getDomain(type, domain),
    }
    SellerIntegrationsService.connectShopifyStore(type, data, redirectLink => {
      if (!!redirectLink) {
        window.location.href = redirectLink;
      }
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }


  const connectWooCommerce = (values) => {
    const { domain, name } = values;
    const data = {
      shopUrl: getDomain(type, domain),
      shopName: name,
    }
    SellerIntegrationsService.connectWooCommerceStore(type, data, redirectLink => {
      if (!!redirectLink) {
        window.location.href = redirectLink;
      }
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }


  const handleConnect = (values) => {
    switch (type) {
      case STORE_TYPE_VALUES.SHOPIFY:
        if (!!values.apiKey && !!values.accessToken) {
          connectShopBase(values);
        } else {
          connectShopify(values);
        }
        break;
      case STORE_TYPE_VALUES.SHOP_BASE:
        connectShopBase(values);
        break;
      case STORE_TYPE_VALUES.WOO_COMMERCE:
        connectWooCommerce(values);
        break;
      default:

    }
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
