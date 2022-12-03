import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { notification } from 'antd';
import { BaseService, SellerIntegrationsService, SellerStoresService } from 'services';
import { ROUTERS, STORE_TYPE_VALUES } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import ShopifyForm from './Vendors/ShopifyForm';
import ShopbaseForm from './Vendors/ShopbaseForm';
import WooCommerceForm from './Vendors/WooCommerceForm';

import './style.scss';

const CONNECT_FORMS = {
  [STORE_TYPE_VALUES.SHOPIFY]: ShopifyForm,
  [STORE_TYPE_VALUES.SHOP_BASE]: ShopbaseForm,
  [STORE_TYPE_VALUES.WOO_COMMERCE]: WooCommerceForm,
}

export default function EditStoreBox({ id, redirectTo }) {
  const [store, setStore] = useState(null);
  const getCategoriesFilter = () => {
    SellerStoresService.getStore(id, response => {
      setStore(response);
    }, () => {}, true)
  }

  useEffect(() => {
    getCategoriesFilter();
    // eslint-disable-next-line
  }, []);

  const handleCancel = () => {
    redirectTo(ROUTERS.SELLER_STORES);
  }

  const handleConnect = (values) => {
    console.log(values);
    const { name, domain, apiKey, password, autoApproveOrder, autoSyncOrder, autoSyncTracking } = values;
    SellerStoresService.updateStore(id, { name, domain, apiKey, password, autoApproveOrder, autoSyncOrder, autoSyncTracking }, response => {
      notification.success({
        message: "Update store successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Update store failure!"),
      });
    })
  }

  const reconnectShopify = (type) => {
    const data = {
      shopUrl: store.domain,
    }

    SellerIntegrationsService.connectShopifyStore(type, data, redirectLink => {
      localStorage.setItem('INTEGRATION_TOKEN_REDIRECT', ROUTERS.SELLER_STORES + `/${store.id}`);
      if (!!redirectLink) {
        window.location.href = redirectLink;
      }
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }

  const reconnectShopBaseWooCommerce = (type) => {
    SellerIntegrationsService.checkConnectStore(type, store.id, response => {
      notification.success({
        message: "Connect store successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }

  const handleReConnect = () => {
    const type = store.platform.toLowerCase();
    switch (type) {
      case STORE_TYPE_VALUES.SHOPIFY:
        reconnectShopify(type);
        break;
      case STORE_TYPE_VALUES.WOO_COMMERCE:
      case STORE_TYPE_VALUES.SHOP_BASE:
        reconnectShopBaseWooCommerce(type);
        break;
      default:
    }
  }
  if (!store) return null;

  const ConnectForm = CONNECT_FORMS[store.platform.toLowerCase()];

  return (
    <BoxCard className="edit-store-box__wrapper">
      <ConnectForm onFinish={handleConnect}
                   onCancel={handleCancel}
                   onReconnect={handleReConnect}
                   initialValues={store}
      />
    </BoxCard>
  )
}
