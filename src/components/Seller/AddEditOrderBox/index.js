import React, { useEffect, useRef, useState } from 'react';
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
import { format } from 'utils';

import './style.scss';

export default function AddEditOrderBox({ isEdit, data, onOk, onCancel, redirectTo }) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productInputValue, setProductInputValue] = useState('');
  const [productsOptions, setProductsOptions] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [storesInputValue, setStoreInputValue] = useState('');
  const [storesOptions, setStoresOptions] = useState([]);
  const [designsInputValue, setDesignsInputValue] = useState('');
  const [designsOptions, setDesignsOptions] = useState([]);
  const [form] = Form.useForm();
  let ref = useRef({});

  const getProducts = (params = {}) => {
    FrontUserCategoriesService.getCategories({ pageNum: 1, pageSize: 100, ...params }, response => {
      const newProductOptions = getProductsOptions(response.items, false);
      setProductsOptions(newProductOptions);
      setSelectedProduct(newProductOptions.length ? newProductOptions[0] : {})
    }, () => {}, true)
  }

  const getStores = (params = {}) => {
    SellerStoresService.getStores({ pageNum: 1, pageSize: 100, ...params }, response => {
      setStoresOptions(getStoresOptions(response.items, false));
    }, () => {}, true)
  }

  const getDesigns = (params = {}) => {
    SellerDesignsService.getDesigns({ pageNum: 1, pageSize: 100, ...params }, response => {
      setDesignsOptions(getDesignsOptions(response.items, false));
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
      storeId: storeId,
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
    // console.log(newData);
    // return;
    if (isEdit) {
      SellerOrdersService.updateOrder(newData, response => {
        notification.success({
          message: "Update order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update order failure!"),
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

  const handleInputChange = (value, name) => {
    if (name === "storeAutoCompleteInput") {
      setStoreInputValue(value);
      setStoreId('');
    } else if (name === "designSKUAutoCompleteInput") {
      setDesignsInputValue(value);
    } else if (name === "productSelectBox") {
      setProductInputValue(value);
    }
    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      if (name === "storeAutoCompleteInput") {
        getStores({ keyword: value });
      } else if (name === "designSKUAutoCompleteInput") {
        getDesigns({ keyword: value });
      } else if (name === "productSelectBox") {
        getProducts({ keyword: value });
      }
    }, 200);
  }

  const handleInputSelect = (value, option, name) => {
    if (name === "storeAutoCompleteInput") {
      setStoreId(option ? option.value : '');
    } else if (name === "designSKUAutoCompleteInput") {
      if (option) {
        form.setFieldsValue({
          mockupUrl: option.convertedDesignUrl,
          designUrl: option.designUrl,
        })
      }
    } else if (name === "productSelectBox") {
      setSelectedProduct(option);
    }
  }

  const onProductOptionsChange = (selectedProductOptions) => {
    let calcPrice = selectedProduct.price;
    let calSku = selectedProduct.id;
    for (const [, value] of Object.entries(selectedProductOptions)) {
      calcPrice += value.priceAdjustment;
      calSku += '|' + value.slug;
    }
    setSelectedProduct({
      ...selectedProduct,
      convertedPrice: format.formatCurrency(calcPrice),
      sku: calSku,
    })
  }

  return (
    <BoxCard className={'add-edit-order-box__wrapper'}>
      <OrderForm
        form={form}
        initialValues={data}
        selectedProduct={selectedProduct}
        productInputValue={productInputValue}
        onProductOptionsChange={onProductOptionsChange}
        productsOptions={productsOptions}
        storesInputValue={storesInputValue}
        storesOptions={storesOptions}
        designsInputValue={designsInputValue}
        designsOptions={designsOptions}
        onInputChange={handleInputChange}
        onInputSelect={handleInputSelect}
        redirectTo={redirectTo}
        onFinish={handleOk}
        onCancel={onCancel}
      />
    </BoxCard>
  )
}
