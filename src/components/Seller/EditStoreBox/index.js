import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { notification } from 'antd';
import ShopifyForm from './Vendors/ShopifyForm';
import { BaseService, SellerIntegrationsService, SellerStoresService } from 'services';
import { ROUTERS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import './style.scss';

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

  const handleReConnect = () => {
    console.log("handleReConnect");
    SellerIntegrationsService.checkConnectStore(store.platform, store.id, response => {
      notification.success({
        message: "Connect store successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect store failure!"),
      });
    })
  }
  if (!store) return null;
  return (
    <BoxCard className="edit-store-box__wrapper">
      <ShopifyForm onFinish={handleConnect}
                   onCancel={handleCancel}
                   onReconnect={handleReConnect}
                   initialValues={store}
      />
    </BoxCard>
  )
}
