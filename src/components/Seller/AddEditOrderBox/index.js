import React, { useEffect, useState } from 'react';
import { Form, notification } from 'antd';
import OrderForm from 'components/Seller/AddEditOrderBox/OrderForm';
import {
  BaseService, FrontUserCategoriesService,
  SellerDesignsService,
  SellerOrdersService,
  SellerStoresService,
} from 'services';
import BoxCard from 'components/Share/BoxCard';
import { getStoresOptions } from 'services/Seller/StoresService';
import { getDesignsOptions } from 'services/Seller/DesignsService';
import { getProductsOptions } from 'services/FrontUser/CategoriesService';

import './style.scss';

export default function AddEditOrderBox({ data, onOk, onCancel, redirectTo }) {
  const [productsOptions, setProductsOptions] = useState([]);
  const [storesOptions, setStoresOptions] = useState([]);
  const [designsOptions, setDesignsOptions] = useState([]);
  const isEdit = !!data;
  const [form] = Form.useForm();

  const getProducts = () => {
    FrontUserCategoriesService.getCategories({ pageNum: 1, pageSize: 100 }, response => {
      setProductsOptions(getProductsOptions(response.items));
    }, () => {}, true)
  }

  const getStores = () => {
    SellerStoresService.getStores({ pageNum: 1, pageSize: 100 }, response => {
      setStoresOptions(getStoresOptions(response.items));
    }, () => {}, true)
  }

  const getDesigns = () => {
    SellerDesignsService.getDesigns({ pageNum: 1, pageSize: 100 }, response => {
      setDesignsOptions(getDesignsOptions(response.items));
    }, () => {}, true)
  }

  useEffect(() => {
    getProducts();
    getStores();
    getDesigns();
  }, []);

  const handleOk = (values) => {
    const newData = {
      productId: values.productId,
      productName: values.productName,
      quantity: values.quantity,
      mockupUrl: values.mockupUrl,
      designUrl: values.designUrl,
      storeId: values.storeId,
      orderNumber: values.orderNumber,
      orderNote: values.orderNote,
      orderShipping: {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address1: values.address1,
        address2: values.address2,
        country: values.country,
        zipCode: values.zipCode,
        region: values.region,
        city: values.city,
      }
    }
    if (isEdit) {
      SellerOrdersService.updateOrder(newData, response => {
        notification.success({
          message: "Update order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create order failure!"),
        });
      })
    } else {
      SellerOrdersService.createOrder(newData, response => {
        notification.success({
          message: "Create order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create order failure!"),
        });
      })
    }
  }


  return (
    <BoxCard className={'add-edit-order-box__wrapper'}>
      <OrderForm
        form={form}
        initialValues={data}
        productsOptions={productsOptions}
        storesOptions={storesOptions}
        designsOptions={designsOptions}
        redirectTo={redirectTo}
        onFinish={handleOk}
        onCancel={onCancel}
      />
    </BoxCard>
  )
}
