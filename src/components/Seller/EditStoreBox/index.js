import React, { useEffect, useState } from 'react';
import { Card, notification } from 'antd';
import ShopifyForm from './Vendors/ShopifyForm';
import { SellerStoresService } from 'services';

export default function EditStoreBox({ id, onFinish, onCancel }) {
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

  const handleConnect = (values) => {
    SellerStoresService.updateStore(id, values, response => {
      notification.success({
        message: "Update store successful!",
      });
      onFinish();
    }, error => {
      notification.error({
        message: error && error.title ? error.title : "Connect store failure!",
      });
    })
  }

  return (
    <Card title={"General Settings"} className="edit-store__wrapper">
      <ShopifyForm onFinish={handleConnect}
                   onCancel={onCancel}
                   initialValues={store}
      />
    </Card>
  )
}
